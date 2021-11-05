package com.ssafy.yam.utils;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3UploadUtils {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket; // S3 버켓 이름

    public String upload(MultipartFile multipartFile, String dirName, String userSet) throws IOException {
        File uploadFile = convert(multipartFile) // 파일 변환할 수 없다면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));

        return upload(uploadFile, dirName, userSet);
    }

    // S3에 파일 업로드하기
    private String upload(File uploadFile, String dirName, String userSet){

        if(uploadFile.equals(null)) return "null";

        String fileName = dirName + "/" + userSet + " - " + uploadFile.getName(); // 저장 시 파일명 중복을 방지하기 위해 랜덤값 삽입
        String uploadImageUrl = putS3(uploadFile, fileName); // S3 저장
        removeNewFile(uploadFile);

        return uploadImageUrl;
    }

    // S3 저장하고 Url 받아오기
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));

        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile){
        if(targetFile.delete()){
            log.info("LocalFile delete success");
            return;
        }
        log.info("LocalFile delete fail");
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + "/" + file.getOriginalFilename());
        if(convertFile.createNewFile()){ // 바로 위에서 지정한 경로에 File이 생성된 경우 (경로가 잘못되었다면 생성 실패)
            try (FileOutputStream fos = new FileOutputStream(convertFile)){
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }
}

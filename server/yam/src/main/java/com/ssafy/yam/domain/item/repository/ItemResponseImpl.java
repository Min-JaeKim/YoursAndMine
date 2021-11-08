//package com.ssafy.yam.domain.item.repository;
//
//import com.querydsl.core.types.Projections;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import com.ssafy.yam.domain.item.dto.response.ItemResponse;
//import lombok.RequiredArgsConstructor;
//
//import java.util.List;
//
//import static com.ssafy.yam.domain.item.entity.QItem.item;
//
//@RequiredArgsConstructor
//public class ItemResponseImpl implements ItemRepositoryCustom{
//
//    private final JPAQueryFactory factory;
//
//    @Override
//    public List<ItemResponse> findAllItemResponseList() {
//        return factory.
//                select(Projections.constructor(ItemResponse.class,
//                    item.itemId,
//                    item.itemName,
//                    item.itemPrice,
//                    item.itemAddress,
//                    item.itemAreaCode,
//                    item.itemModifiedTime))
//                .from(item).fetch();
//    }
//}

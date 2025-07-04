"use client"

import { CardInfor } from "@/app/components/CardInfor/CardInfor";
import { useEffect, useState } from "react";

export const DataCardInfor = (props: {
    slug: string
}) => {
    const { slug } = props;
    const [categoryDetail, setCategoryDetail] = useState<any>({});

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/detail/${slug}`)
            .then(res => res.json())
            .then((data) => {
                setCategoryDetail(data.categoryDetail)
            })
    }, [])

    return (
        <>
            {categoryDetail && (
                <CardInfor
                    item={categoryDetail}
                />
            )}
        </>
    );
}
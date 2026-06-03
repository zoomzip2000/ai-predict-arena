"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface CategoryData {
  categoryUuid: string;
  categoryName: string;
  categoryColor: string | null;
  localizations?: { language: string; name: string }[];
}

interface Category {
  href: string;
  label: string;
  uuid: string;
  data?: CategoryData;
}

interface Props {
  categoryList: Category[];
}

const getLocalCategoryName = (category: Category, lang: string) => {
  if (category.data?.localizations) {
    const localCategory = category.data.localizations.find(
      (item) => item.language.toLowerCase() === lang.toLowerCase()
    );
    if (localCategory) {
      return localCategory.name;
    }
  }
  return category.label;
};

export default function CategoryList({ categoryList }: Props) {
  const lang = useSelector((state: RootState) => state.main.lang).toLowerCase();
  const activeLang = lang === "ua" ? "uk" : lang;

  // Split categories into tuples of 2 for layout alignment on mobile (like in MyCoin)
  const tuples = categoryList.reduce<Category[][]>((acc, _, i) => {
    if (i % 2 === 0) {
      return [...acc, categoryList.slice(i, i + 2)];
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 my-6 w-full px-4 select-none">
      {tuples.map((tuple, tupleIdx) => (
        <div key={`tuple-${tupleIdx}`} className="flex gap-3 w-full sm:w-auto">
          {tuple.map((category) => (
            <Link
              key={category.uuid}
              href={category.href}
              className="flex-1 sm:flex-initial sm:min-w-[213px] min-h-[44px] flex items-center justify-center py-2 px-4 cursor-pointer text-sm font-bold text-text-primary rounded-lg border border-nm-border nm-card hover:nm-shadow-inset-sm transition-all text-center text-decoration-none"
            >
              {getLocalCategoryName(category, activeLang)}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

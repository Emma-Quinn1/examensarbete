import React from "react";
import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/react";

export const ChevronIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export interface CustomPaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const renderItem = ({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
}: PaginationItemRenderProps) => {
  if (value === PaginationItemType.NEXT) {
    return (
      <button
        key={key}
        ref={ref}
        className="pagination-button next"
        onClick={onNext}
      >
        <ChevronIcon className="icon-rotate" />
      </button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button
        key={key}
        ref={ref}
        className="pagination-button prev"
        onClick={onPrevious}
      >
        <ChevronIcon />
      </button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} ref={ref} className="pagination-dots" disabled>
        ...
      </button>
    );
  }

  return (
    <button
      key={key}
      ref={ref}
      className={`pagination-number ${isActive ? "active" : ""}`}
      onClick={() => setPage(value as number)}
    >
      {value}
    </button>
  );
};

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  return (
    <Pagination
      disableCursorAnimation
      showControls
      className="pagination-container"
      initialPage={currentPage}
      radius="full"
      renderItem={renderItem}
      total={total}
      variant="light"
      onChange={onPageChange}
    />
  );
};

import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

// ============================================
// TYPE DEFINITIONS
// ============================================

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  homeIcon?: boolean;
  className?: string;
}

// ============================================
// BREADCRUMBS COMPONENT
// ============================================

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
  maxItems,
  homeIcon = false,
  className = "",
}) => {
  // Handle collapsed items when maxItems is set
  const displayItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));

    return [firstItem, { label: "...", href: undefined }, ...lastItems];
  }, [items, maxItems]);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 ${className} md:px-10 px-4 pb-2 md:pt-8 pt-16 lg:pt-22`}
    >
      <ol className="flex items-center space-x-2 flex-wrap">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isCollapsed = item.label === "...";

          return (
            <li key={index} className="flex items-center space-x-2">
              {/* for icons  */}
              {index === 0 && homeIcon ? (
                <Home className="w-4 h-4 text-gray-500" />
              ) : item.icon ? (
                <span className="flex items-center">{item.icon}</span>
              ) : null}

              {isCollapsed ? (
                <span className="text-gray-500 px-2">...</span>
              ) : item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-[#febd2f] hover:text-[#f7ad0c] hover:underline transition-colors duration-150 text-sm font-medium"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`text-sm font-medium ${
                    isLast && "text-[#173334]"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label.slice(0, 15)}
                </span>
              )}

              {!isLast && (
                <span className="flex items-center" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

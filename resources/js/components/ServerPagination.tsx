import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type PaginationLink } from "@/types";

interface ServerPaginationProps {
  page: number;
  lastPage: number;
  total: number;
  from: number | null;
  to: number | null;
  links: PaginationLink[];
}

export function ServerPagination({
  page,
  lastPage,
  total,
  from,
  to,
  links,
}: ServerPaginationProps) {
  const handlePageChange = (url: string | null) => {
    if (!url) return;
    router.get(url, {}, { preserveScroll: true, preserveState: true });
  };

  const prevLink = links.find(link => link.label.includes("Previous"));
  const nextLink = links.find(link => link.label.includes("Next"));

  // Filter out only the numeric page links
  const pageLinks = links.filter(link => !isNaN(Number(link.label)));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-2">
      {/* Results Info */}
      <div className="text-sm text-muted-foreground">
        {total === 0
          ? "Showing 0 results"
          : `Showing ${from || 0} to ${to || 0} of ${total} results`}
      </div>

      {/* Pagination Controls */}
      {lastPage > 1 && (
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(prevLink?.url || null)}
            disabled={!prevLink?.url || page === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {/* Page Number Buttons */}
          <div className="flex items-center space-x-1">
            {pageLinks.map((link, index) => (
              <Button
                key={`${link.label}-${index}`}
                variant={link.active ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(link.url)}
                disabled={link.active}
                className="min-w-[2.5rem]"
              >
                {link.label}
              </Button>
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(nextLink?.url || null)}
            disabled={!nextLink?.url || page === lastPage}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

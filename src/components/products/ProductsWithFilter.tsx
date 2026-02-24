import { useState, useMemo } from "react";
import PriceRangeFilter from "./PriceRangeFilter";

// Mirror your CollectionEntry shape — adjust fields as needed
interface Product {
  slug: string;
  data: {
    title: string;
    price: number;
    category?: string[];
    image?: string;
    description?: string;
  };
}

interface ProductsWithFilterProps {
  allProducts: any;
  productsPerPage?: number;
  currency?: string;
}

// ─── tiny ProductCard (replace with your real card or pass as slot) ────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow dark:border-neutral-700 dark:bg-neutral-900 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] flex flex-col">
    <a href={`/products/${product.slug}`} className="block flex-1 flex flex-col">
    <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
      <img
        src={product.data.image}
        alt={product.data.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="text-lg font-semibold text-neutral-800 mb-2 dark:text-neutral-200">
        {product.data.title}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
          {product.data.description}
        </p>
      <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 my-4 mt-auto">
      ₹{product.data.price?.toLocaleString()}
      </p>
    </div>
    </a>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ProductsWithFilter({
  allProducts,
  productsPerPage = 8,
  currency = "₹",
}: ProductsWithFilterProps) {
  // Compute global min/max prices once
  const prices = allProducts.map((p:any) => p.data.price ?? 0);
  const globalMin = Math.min(...prices);
  const globalMax = Math.max(...prices);

  const [minPrice, setMinPrice] = useState(globalMin);
  const [maxPrice, setMaxPrice] = useState(globalMax);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products by price range
  const filtered = useMemo(() => {
    return allProducts.filter((p:any) => {
      const price = p.data.price ?? 0;
      return price >= minPrice && price <= maxPrice;
    });
  }, [allProducts, minPrice, maxPrice]);

  // Paginate filtered results
  const totalPages = Math.max(1, Math.ceil(filtered.length / productsPerPage));
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + productsPerPage);

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ── Price Filter Card ── */}
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        <PriceRangeFilter
          min={globalMin}
          max={globalMax}
          currentMin={minPrice}
          currentMax={maxPrice}
          currency={currency}
          onChange={handlePriceChange}
        />
      </div>

      {/* ── Results count ── */}
      <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
        Showing <span className="font-semibold text-neutral-800 dark:text-neutral-200">{filtered.length}</span> products
      </p>

      {/* ── Products Grid ── */}
      {paginated.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-6 mb-12">
          {paginated.map((product:any) => (
              <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            No products found in this price range.
          </p>
          <button
            onClick={() => { setMinPrice(globalMin); setMaxPrice(globalMax); }}
            className="mt-4 text-sm text-blue-600 underline underline-offset-2 hover:text-blue-700"
          >
            Reset filter
          </button>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          {currentPage > 1 ? (
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 text-sm font-medium rounded border border-neutral-800 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              წინა
            </button>
          ) : (
            <span className="px-4 py-2 text-sm font-medium rounded border border-neutral-300 text-neutral-400 cursor-not-allowed dark:border-neutral-700 dark:text-neutral-600">
              წინა
            </span>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 text-sm font-medium rounded border transition-colors ${
                pageNum === currentPage
                  ? "bg-neutral-800 text-white border-neutral-800 dark:bg-neutral-200 dark:text-neutral-800 dark:border-neutral-200"
                  : "border-neutral-800 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          {currentPage < totalPages ? (
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 text-sm font-medium rounded border border-neutral-800 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              შემდეგი
            </button>
          ) : (
            <span className="px-4 py-2 text-sm font-medium rounded border border-neutral-300 text-neutral-400 cursor-not-allowed dark:border-neutral-700 dark:text-neutral-600">
              შემდეგი
            </span>
          )}
        </div>
      )}
    </div>
  );
}

import { component$, type Signal } from "@builder.io/qwik";

interface SearchBarProps {
  value: Signal<string>;
}

export default component$<SearchBarProps>(({ value }) => {
  return (
    <div class="max-w-6xl w-full mx-auto">
      <div class="py-2">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-primary sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            class="block w-full p-4 ps-10 text-sm text-primary border border-border rounded-lg bg-box-background focus:ring-primary focus:border-primary outline-none"
            placeholder="Search event detail..."
            bind:value={value}
          />
          <button
            type="button"
            class="text-primary absolute end-2.5 bottom-2.5 bg-background focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-4 py-2"
            onClick$={() => (value.value = "")}
          >
            Clear
          </button>
        </div>
      </div>
      <hr class="w-64 h-px mt-2 mb-1 m-auto bg-gray-200 border-0" />
    </div>
  );
});

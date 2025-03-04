import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useSearch() {
  const route = useRoute();
  const router = useRouter();
  const searchQuery = ref(route.query.search || "");

  watch(searchQuery, () => {
    router.replace({ query: { ...route.query, search: searchQuery.value } });
  });

  return { searchQuery };
}

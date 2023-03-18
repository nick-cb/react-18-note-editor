import PageLayout from "@/PageLayout";

export default function Home({
  params,
  searchParams,
}: {
  params: { searchText: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <PageLayout params={params} searchParams={searchParams}>
      Page
    </PageLayout>
  );
}

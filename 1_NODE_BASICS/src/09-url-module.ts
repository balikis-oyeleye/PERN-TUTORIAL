// https://api.example.com/users?page=1&limit=10

function runUrlDemo() {
  const apiUrl = new URL("https://api.example.com/users");
  apiUrl.searchParams.set("page", "1");
  apiUrl.searchParams.set("limit", "10");
  console.log(
    apiUrl.href,
    apiUrl.protocol,
    apiUrl.hostname,
    apiUrl.pathname,
    apiUrl.search,
    apiUrl.searchParams.get("page"),
    apiUrl.searchParams.get("limit"),
  );

  const queryParams = new URLSearchParams({
    page: "1",
    limit: "10",
  });

  console.log(queryParams.toString());
}

runUrlDemo();

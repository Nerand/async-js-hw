function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchData(url) {
  // используем ту же фиктивную "базу", что и в задаче 2
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "/api/users") {
        resolve([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]);
      } else if (url.startsWith("/api/users/")) {
        const id = Number(url.split("/").pop());
        resolve({ id, name: id === 1 ? "Alice" : "Unknown", email: "user@example.com" });
      } else {
        reject(new Error("404: Unknown endpoint " + url));
      }
    }, 2000);
  });
}

async function main() {
  try {
    console.log("Старт async/await цепочки...");
    const users = await fetchData("/api/users");
    console.log("Пользователи получены:", users);

    await delay(500); // небольшая пауза между запросами
    const first = users[0];
    if (!first) throw new Error("Пустой список пользователей");

    const user = await fetchData(`/api/users/${first.id}`);
    console.log("Информация о первом пользователе:", user);
    console.log("Успех: async/await цепочка завершена.");
  } catch (err) {
    console.error("Ошибка в async/await цепочке:", err.message);
  }
}

main();
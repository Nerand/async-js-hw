/**
Задание 2. Работа с Promise
Реализуем fetchData(url): возвращает Promise с задержкой ~2s.
Затем цепочка: "получить список пользователей" -> "получить первого пользователя".
Ошибки обрабатываем через .catch().
*/

function fetchData(url) {
  return new Promise((resolve, reject) => {
    const delay = 2000; // 2 секунды
    setTimeout(() => {
      // Эмуляция "API-ответов"
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
    }, delay);
  });
}

console.log("Запуск цепочки промисов...");
fetchData("/api/users")
  .then((users) => {
    console.log("Список пользователей:", users);
    if (!Array.isArray(users) || users.length === 0) {
      throw new Error("Пустой список пользователей");
    }
    const first = users[0];
    // Возвращаем новый промис — второй запрос
    return fetchData(`/api/users/${first.id}`);
  })
  .then((user) => {
    console.log("Информация о первом пользователе:", user);
  })
  .catch((err) => {
    console.error("Ошибка в цепочке:", err.message);
  })
  .finally(() => {
    console.log("Готово: цепочка промисов завершена (успех или ошибка).");
  });
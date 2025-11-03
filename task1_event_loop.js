console.log("A) sync: старт скрипта");

setTimeout(() => {
  console.log("F) macrotask: setTimeout 0ms");
}, 0);

Promise.resolve().then(() => {
  console.log("C) microtask: Promise.then #1");
}).then(() => {
  console.log("D) microtask: Promise.then #2 (цепочка)");
});

queueMicrotask(() => {
  console.log("E) microtask: queueMicrotask");
});

setTimeout(() => {
  console.log("G) macrotask: setTimeout 10ms");
}, 10);

console.log("B) sync: конец основного стека");
/**
 * A (sync старт)
 * B (sync конец)
 * C (микротаск из Promise.then #1)
 * D (следующий then в той же микротаск-очереди)
 * E (микротаск)
 * F (macrotask setTimeout 0ms)
 * G (macrotask setTimeout 10ms)
 *
 * Пояснение:
 * - Сначала выполняется весь синхронный код (A, B).
 * - Затем Event Loop освобождает стек и обрабатывает очередь МИКРОтасков (C, D, E).
 * - После опустошения microtask-очереди берётся первая МАКРОтаска (F), потом следующая (G).
 */
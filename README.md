```ts
const age$ = new BehaviorSubject(18)
age$.next(20)
age$.value

age$.subscribe((nb) => {
    console.log(nb) // 20, 40
})

age$.next(40) 
```

```ts
const age = signal(18)
age.set(20)
age()

effect(() => {
    console.log(age()) // 20, 40
})

age.set(40)
```



A, B, C

startWith('test')

test A B C
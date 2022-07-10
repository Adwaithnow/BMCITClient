// const weekDay = (day:string, highlight:boolean) => {
const weekDay = () => {
    return 2
}

const add = (a:number,b:number) => {
    return a+b
}

const fareDetails:{[key:string]: any} = {
    SLEEPER: {
        cost: 22.2,
    },
    AC: {
        cost: 35.4,
    }
}

export {
    fareDetails,
    weekDay,
    add
}
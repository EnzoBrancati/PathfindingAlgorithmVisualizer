export let speed = 50;

export function setSpeed(state) {

    switch (state) {
        case "slow":
            speed = 100;
            break;

        case "medium":
            speed = 50;
            break;

        case "fast":
            speed = 10;
            break;

        default:
            console.error("case " + state + " non valido");
            break;
    }
}
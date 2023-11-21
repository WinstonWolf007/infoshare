export default function create_tocken(): number {
    const min = 100000;
    const max = 999999;
    const random_num = Math.floor(Math.random() * (max - min + 1)) + min;
    return random_num;
}

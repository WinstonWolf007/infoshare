const email_input = document.querySelector("#input");
const submit_btn = document.querySelector("input[type='submit']");

submit_btn.addEventListener("click", () => {
    const email_value = email_input.value;
    if (email_input) {
        createCookie("email", email_value, 1);
    };
});

function flipAccountCard() {
    const card = document.querySelector(".flip-card");
    const inputs = document.querySelectorAll("input");

    inputs.forEach(el => {
        if (el.type !== "submit") {
            el.value = "";
        }
    });

    card.classList.toggle("flip-card-anim");
}


class LoginButton {
    constructor() {
        this.dom_front = document.querySelector(".flip-card-front > form:nth-child(1) > section:nth-child(1) > section:nth-child(3) > div:nth-child(2) > input:nth-child(1)")
        this.dom_back = document.querySelector(".flip-card-back > form:nth-child(1) > section:nth-child(1) > section:nth-child(3) > div:nth-child(2) > input:nth-child(1)")
    }

    get dom_elements() {
        return [this.dom_front, this.dom_back];
    }

    hover_on() {
        this.dom_elements.forEach(dom_el => {
            dom_el.addEventListener("mouseover", () => {
                dom_el.classList.add("overSIzeToLeft");
                dom_el.classList.remove("ball");
            });
        });

        return this;
    }

    hover_out() {
        this.dom_elements.forEach(dom_el => {
            dom_el.addEventListener("mouseout", () => {
                dom_el.classList.add("ball");
                dom_el.classList.remove("overSIzeToLeft");
            });
        });

        return this;
    }
}

new LoginButton()
    .hover_on()
    .hover_out()

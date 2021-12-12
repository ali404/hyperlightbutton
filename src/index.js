import "./css/index.css"

function createElement({
    type,
    attributes = {},
    text = null,
    children = [],
    before = true
}) {
    const el_main = document.createElement(type)
    const elt_main = document.createTextNode(text)
    const shouldRenderText = !!text

    ;(attributes.class || "")
    .split(" ")
    .filter(el => !!el)
    .forEach(cls => {
        el_main.classList.add(cls)
    })
    
    if(before && shouldRenderText) {
        el_main.appendChild(elt_main)
    }

    children.forEach(el => el_main.appendChild(el))

    if(!before && shouldRenderText) {
        el_main.appendChild(elt_main)
    }

    return el_main
}

function main() {
    const root = document.getElementById("root");
    const border_shadow1 = createElement({
        type: "div",
        attributes: {class: "btn-border btn-border-shadow"}
    })
    const border_shadow2 = createElement({
        type: "div",
        attributes: {class: "btn-border btn-border-shadow"}
    })
    const inner_btn = createElement({
        type: "div",
        attributes: {class: "btn"},
        text: "E"
    })
    const elb = createElement({
        type: "div",
        attributes: {class: "cnt cnt-blue"},
    })
    const ely = createElement({
        type: "div",
        attributes: {class: "cnt cnt-yellow"},
    })
    const elr = createElement({
        type: "div",
        attributes: {class: "cnt cnt-red"},
    })
    const text = createElement({
        type: "span",
        text: "Select",
    })
    const btn = createElement({
        type: "div",
        attributes: {
            class: "btn-container btn-border",
        },
        children: [border_shadow1, border_shadow2, inner_btn, elb, ely, elr, text],
        before: false
    })
    
    btn.addEventListener("click", ev => {
        let start
        
        const steps = Array.apply(null, Array(7)).map((el,idx) => {
            return (idx+1) * 32
        })
        
        function enterAnimation(timestamp) {
            if(!start) start = timestamp;
            const elapsed = timestamp - start;

            /* null animation frame */
            if(elapsed < steps[0]) {
                inner_btn.style.display = 'none';
                btn.style.display = 'none';

                elb.style.opacity = 0.0;
                ely.style.opacity = 0.0;
                elr.style.opacity = 0.0;

                border_shadow1.style.setProperty("--borderc", "#b80665");
                border_shadow2.style.setProperty("--borderc", "#b80665");

                border_shadow1.style.opacity = 0.2;
                border_shadow2.style.opacity = 0;
            }
            /* 1st  animation frame */
            else if(elapsed < steps[1]) {
                btn.style.display = 'flex';
                [elb,ely,elr].map(el => el).forEach(el => {
                    el.style.display = 'block';
                })
                ely.style.opacity = 0.7;
                
                border_shadow1.style.opacity = 0.2;
            }
            /* 2nd animation frame */
            else if(elapsed < steps[2]) {
                elb.style.transform = 'translate(0, -22px)';
                ely.style.transform = 'translate(0, 0)';
                elr.style.transform = 'translate(0, 11px)';

                elb.style.opacity = 0.2;
                ely.style.opacity = 0.6;
                elr.style.opacity = 0.2;

                border_shadow1.style.opacity = 0.4;
            }
            /* 3rd animation frame */
            else if(elapsed < steps[3]) {
                elb.style.opacity = 0.4;
                ely.style.opacity = 0.8;
                elr.style.opacity = 0.4;


                border_shadow1.style.opacity = 0.6;
                border_shadow2.style.opacity = 0.3; 
                border_shadow2.style.transform = 'translate(0, 12px)';
            }
            /* 4th animation frame */
            else if(elapsed < steps[4]) {
                elb.style.transform = 'translate(0, -13px)';
                ely.style.opacity = 1;
                
                border_shadow1.style.opacity = 0.8;
                border_shadow2.style.opacity = 0.5;
            }
            /* 5th animation frame */
            else if(elapsed < steps[5]) {
                elb.style.transform = 'translate(0, -4px)';
                elr.style.transform = 'translate(0, 4px)';
                border_shadow2.style.transform = 'translate(0, 6px)';
            }
            /* 6th animation frame (final) */
            else if(elapsed < steps[6]) {
                inner_btn.style.display = 'flex';
                [elb, ely, elr].map(el => el).forEach(el => {
                    el.style.display = 'none';
                })

                border_shadow1.style.setProperty("--borderc", "#3d0724");
                border_shadow2.style.setProperty("--borderc", "#3d0724");
                border_shadow2.style.transform = 'translate(0, 0)';
            }
            
            if(elapsed < steps[6]) {
                requestAnimationFrame(enterAnimation);
            }
        }
        requestAnimationFrame(enterAnimation);
    })

    requestAnimationFrame(() => {
        root.appendChild(btn);
        setTimeout(() => {
            requestAnimationFrame(() => {
                const rect = btn.getBoundingClientRect();
                ([border_shadow1, border_shadow2]).forEach(el => {
                    el.style.height = `${rect.height}px`;
                    el.style.width = `${rect.width}px`;
                    el.style.display = 'block';
                });
                btn.classList.remove("btn-border");
                border_shadow2.style.opacity = 0;
            });
        }, 100);
    });
}

(function() {
    window.addEventListener('DOMContentLoaded', () => {
        main()
    });
})();

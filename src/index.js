import "./css/index.css"

function createElement({
    type,
    attributes,
    text = null,
    children = [],
    before = true
}) {
    const el_main = document.createElement(type)
    const elt_main = document.createTextNode(text)
    const shouldRenderText = !!text

    ;(attributes.class || "").split(" ").forEach(cls => {
        el_main.classList.add(cls)
    })
    
    if(before && shouldRenderText) {
        el_main.appendChild(elt_main)
    }

    children.forEach(el => el_main.appendChild(el.component))

    if(!before && shouldRenderText) {
        el_main.appendChild(elt_main)
    }

    return {
        component: el_main,
    }
}

function main() {
    const root = document.getElementById("root");
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
    const btn = createElement({
        type: "div",
        attributes: {
            class: "btn-container",
        },
        text: "Select",
        children: [inner_btn, elb, ely, elr],
        before: false
    })
    
    btn.component.addEventListener("click", ev => {
        let start
        
        const steps = Array.apply(null, Array(7)).map((el,idx) => {
            return (idx+1) * 32
        })
        
        function enterAnimation(timestamp) {
            if(!start) start = timestamp;
            const elapsed = timestamp - start;

            if(elapsed < steps[0]) {
                inner_btn.component.style.display = 'none';
                btn.component.style.display = 'none';

                elb.component.style.opacity = 0.0;
                ely.component.style.opacity = 0.0;
                elr.component.style.opacity = 0.0;
            }
            else if(elapsed < steps[1]) {
                btn.component.style.display = 'flex';
                [elb,ely,elr].map(el => el.component).forEach(el => {
                    el.style.display = 'block';
                })
                ely.component.style.opacity = 0.7;
            }
            else if(elapsed < steps[2]) {
                elb.component.style.transform = 'translate(0, -22px)';
                ely.component.style.transform = 'translate(0, 0)';
                elr.component.style.transform = 'translate(0, 11px)';

                elb.component.style.opacity = 0.2;
                ely.component.style.opacity = 0.6;
                elr.component.style.opacity = 0.2;
            }
            else if(elapsed < steps[3]) {
                elb.component.style.opacity = 0.4;
                ely.component.style.opacity = 0.8;
                elr.component.style.opacity = 0.4;
            }
            else if(elapsed < steps[4]) {
                elb.component.style.transform = 'translate(0, -13px)';
                ely.component.style.opacity = 1;
            }
            else if(elapsed < steps[5]) {
                elb.component.style.transform = 'translate(0, -4px)';
                elr.component.style.transform = 'translate(0, 4px)';
            }
            else if(elapsed < steps[6]) {
                inner_btn.component.style.display = 'flex';
                [elb, ely, elr].map(el => el.component).forEach(el => {
                    el.style.display = 'none';
                })
            }
            
            if(elapsed < steps[6]) {
                requestAnimationFrame(enterAnimation);
            }
        }
        requestAnimationFrame(enterAnimation);
    })

    requestAnimationFrame(() => {
        root.appendChild(btn.component);
    })
}

(function() {
    window.addEventListener('DOMContentLoaded', () => {
        main()
    });
})();

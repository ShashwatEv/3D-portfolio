import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: TextSplit;
}

gsap.registerPlugin(ScrollTrigger);

export class TextSplit {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  private readonly elements: HTMLElement[];
  private readonly originalMarkup: string[];

  constructor(
    target: string | Element | Array<string | Element>,
    options: { type?: string; linesClass?: string } = {}
  ) {
    const targets = Array.isArray(target) ? target : [target];
    this.elements = targets.flatMap((item) => {
      if (typeof item === "string") {
        return Array.from(document.querySelectorAll<HTMLElement>(item));
      }
      return item instanceof HTMLElement ? [item] : [];
    });
    this.originalMarkup = this.elements.map((element) => element.innerHTML);

    if (options.type?.includes("words")) {
      this.elements.forEach((element) => {
        this.words.push(...this.wrapWords(element));
      });
    } else {
      this.elements.forEach((element) => {
        this.chars.push(...this.wrapChars(element));
      });
    }
  }

  revert() {
    this.elements.forEach((element, index) => {
      element.innerHTML = this.originalMarkup[index];
    });
  }

  private wrapChars(element: HTMLElement) {
    const chars: HTMLElement[] = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let node = walker.nextNode();
    while (node) {
      textNodes.push(node as Text);
      node = walker.nextNode();
    }

    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      Array.from(textNode.textContent ?? "").forEach((char) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.textContent = char === " " ? "\u00a0" : char;
        fragment.appendChild(span);
        chars.push(span);
      });
      textNode.parentNode?.replaceChild(fragment, textNode);
    });

    return chars;
  }

  private wrapWords(element: HTMLElement) {
    const words = (element.textContent ?? "").split(/(\s+)/);
    element.textContent = "";
    return words.reduce<HTMLElement[]>((wrapped, word) => {
      if (/\s+/.test(word)) {
        element.appendChild(document.createTextNode(word));
        return wrapped;
      }
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.textContent = word;
      element.appendChild(span);
      element.appendChild(document.createTextNode(" "));
      wrapped.push(span);
      return wrapped;
    }, []);
  }
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new TextSplit(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new TextSplit(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

}

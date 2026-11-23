/**
 * منصة من الآخر في القدرات — وحدة التحكم التفاعلية
 * التفاعل السريع، الكشف عند التمرير، نسخ الشروحات، ومحاكاة الأسئلة
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. كشف البطاقات والمميزات تدريجياً عند التمرير
  const revealCards = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.15,
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-revealed");
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealCards.forEach((card) => cardObserver.observe(card));
  } else {
    revealCards.forEach((card) => card.classList.add("is-revealed"));
  }

  // 2. نسخ استراتيجية الحل والمسألة للحافظة
  const copyBtn = document.getElementById("copy-code-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const codeBlock = document.querySelector(".code-pre code");
      if (!codeBlock) return;

      const codeText = codeBlock.innerText;

      try {
        await navigator.clipboard.writeText(codeText);
        const statusText = copyBtn.querySelector(".copy-status-text");
        const originalText = statusText ? statusText.textContent : "نسخ المسألة";

        copyBtn.classList.add("copied");
        if (statusText) statusText.textContent = "تم النسخ بنجاح! ✓";

        setTimeout(() => {
          copyBtn.classList.remove("copied");
          if (statusText) statusText.textContent = originalText;
        }, 2200);
      } catch (err) {
        console.error("فشل النسخ إلى الحافظة: ", err);
      }
    });
  }

  // 3. تأثير تتبع الإضاءة التفاعلية داخل البطاقات
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 4. زر الإجراء الرئيسي: الانتقال السلس للتأسيس
  const primaryCta = document.getElementById("hero-primary-cta");
  if (primaryCta) {
    primaryCta.addEventListener("click", () => {
      const featSection = document.getElementById("features");
      if (featSection) {
        featSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

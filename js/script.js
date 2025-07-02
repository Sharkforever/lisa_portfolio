// 主要功能模块
class WebsiteController {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAIChat();
        this.setupAnimations();
        this.setupMobileMenu();
        this.setupContactForm();
    }

    // 导航功能
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        // 平滑滚动
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // 滚动时高亮当前导航
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && 
                    window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 滚动效果
    setupScrollEffects() {
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            // 导航栏背景变化
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // 滚动动画观察器
        this.setupScrollAnimations();
    }

    // 滚动动画
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        const animatedElements = document.querySelectorAll(
            '.skill-category, .project-card, .timeline-item, .highlight-item'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // AI对话框功能
    setupAIChat() {
        const chatWidget = document.getElementById('aiChatWidget');
        const chatToggle = document.getElementById('chatToggle');
        const chatWindow = document.getElementById('chatWindow');
        const chatClose = document.getElementById('chatClose');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const chatMessages = document.getElementById('chatMessages');

        if (!chatWidget || !chatToggle || !chatWindow) return;

        let isOpen = false;

        // 切换对话框显示/隐藏
        const toggleChat = () => {
            isOpen = !isOpen;
            if (isOpen) {
                chatWindow.style.display = 'flex';
                chatToggle.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    chatWindow.style.opacity = '1';
                    chatWindow.style.transform = 'translateY(0)';
                }, 10);
            } else {
                chatWindow.style.opacity = '0';
                chatWindow.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    chatWindow.style.display = 'none';
                    chatToggle.style.transform = 'rotate(0deg)';
                }, 300);
            }
        };

        // 发送消息
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (!message) return;

            // 添加用户消息
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
            chatMessages.appendChild(userMessage);

            // 清空输入框
            chatInput.value = '';

            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // 模拟AI回复
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'message bot-message';
                botMessage.innerHTML = `
                    <div class="message-content">
                        <p>感谢您的咨询！我是Lisa的AI助手。关于"${message}"，我建议您直接联系Lisa获得更专业的解答。您可以通过页面底部的联系方式与她取得联系。</p>
                    </div>
                `;
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        };

        // 事件监听
        chatToggle.addEventListener('click', toggleChat);
        if (chatClose) {
            chatClose.addEventListener('click', toggleChat);
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', sendMessage);
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        // 点击外部关闭对话框
        document.addEventListener('click', (e) => {
            if (isOpen && 
                !chatWidget.contains(e.target)) {
                toggleChat();
            }
        });

        // ESC键关闭对话框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                toggleChat();
            }
        });
    }

    // 联系表单功能
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // 获取表单数据
                const formData = new FormData(contactForm);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                };
                
                // 模拟发送
                this.showNotification('消息已发送！Lisa会尽快回复您。', 'success');
                contactForm.reset();
            });
        }
    }

    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 动画效果
    setupAnimations() {
        // 打字机效果
        this.typewriterEffect();
        
        // 技能标签悬停效果
        this.setupSkillHoverEffects();
        
        // 项目卡片3D效果
        this.setup3DCardEffects();
    }

    // 打字机效果
    typewriterEffect() {
        const sloganElement = document.querySelector('.hero-slogan');
        if (!sloganElement) return;

        const text = sloganElement.textContent;
        sloganElement.textContent = '';
        sloganElement.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeSpeed = 100;
        
        const typeWriter = () => {
            if (i < text.length) {
                sloganElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // 移除光标效果
                setTimeout(() => {
                    sloganElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // 延迟开始打字效果
        setTimeout(typeWriter, 1000);
    }

    // 技能悬停效果
    setupSkillHoverEffects() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05) rotate(2deg)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    // 3D卡片效果
    setup3DCardEffects() {
        const cards = document.querySelectorAll('.project-card, .skill-category');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // 移动端菜单
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // 点击菜单项后关闭菜单
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
}

// 工具函数
class Utils {
    // 节流函数
    static throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 防抖函数
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 平滑滚动到元素
    static scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    // 检查元素是否在视口中
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// 性能监控
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // 监控页面加载时间
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.loadTime = loadTime;
            console.log(`页面加载时间: ${loadTime.toFixed(2)}ms`);
        });

        // 监控首次内容绘制
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.fcp = entry.startTime;
                        console.log(`首次内容绘制: ${entry.startTime.toFixed(2)}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['paint'] });
        }
    }

    // 获取性能指标
    getMetrics() {
        return this.metrics;
    }
}

// 错误处理
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // 全局错误处理
        window.addEventListener('error', (event) => {
            console.error('JavaScript错误:', event.error);
            this.logError('JavaScript Error', event.error);
        });

        // Promise错误处理
        window.addEventListener('unhandledrejection', (event) => {
            console.error('未处理的Promise拒绝:', event.reason);
            this.logError('Unhandled Promise Rejection', event.reason);
        });
    }

    // 记录错误
    logError(type, error) {
        const errorInfo = {
            type: type,
            message: error.message || error,
            stack: error.stack || '',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // 这里可以发送错误信息到服务器
        console.log('错误信息:', errorInfo);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    try {
        // 初始化主控制器
        const website = new WebsiteController();
        
        // 初始化性能监控
        const performanceMonitor = new PerformanceMonitor();
        
        // 初始化错误处理
        const errorHandler = new ErrorHandler();
        
        // 将实例挂载到全局，便于调试
        window.website = website;
        window.performanceMonitor = performanceMonitor;
        
        console.log('网站初始化完成');
        
    } catch (error) {
        console.error('网站初始化失败:', error);
    }
});
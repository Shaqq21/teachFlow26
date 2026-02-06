import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function AlFarabiBot() {
    const { t, language } = useLanguage()
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: language === 'kk'
                ? 'Сәлем! Мен әл-Фарабимін. Сізге қалай көмектесе аламын?'
                : 'Приветствую! Я аль-Фараби. Чем могу быть полезен?'
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    const botAvatar = "👳‍♂️" // Placeholder until image generation works

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        // Update welcome message when language changes
        setMessages(prev => prev.map(msg =>
            msg.id === 1 ? {
                ...msg,
                text: language === 'kk'
                    ? 'Сәлем! Мен әл-Фарабимін. Сізге қалай көмектесе аламын?'
                    : 'Приветствую! Я аль-Фараби. Чем могу быть полезен?'
            } : msg
        ))
    }, [language])

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    async function handleSendMessage(e) {
        e.preventDefault()
        if (!inputValue.trim()) return

        // Add user message
        const newMessages = [...messages, { id: Date.now(), type: 'user', text: inputValue }]
        setMessages(newMessages)
        setInputValue('')
        setIsTyping(true)

        // Simulate AI delay
        setTimeout(() => {
            const responses = language === 'kk' ? [
                "Бұл өте қызықты сұрақ. Ғылым мен білім - адамзаттың қазынасы.",
                "Мен ойлануым керек... Шындық іздеу жолында асығыстық жарамайд.",
                "Сіздің пікіріңіз даналыққа жақын.",
                "Математика мен музыка арасындағы байланыс туралы не ойлайсыз?"
            ] : [
                "Это очень интересный вопрос. Наука и знание - сокровища человечества.",
                "Мне нужно подумать... В поиске истины спешка неуместна.",
                "Ваше мнение близко к мудрости.",
                "Что вы думаете о связи между математикой и музыкой?"
            ]

            const randomResponse = responses[Math.floor(Math.random() * responses.length)]

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: randomResponse
            }])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            {/* Header Area */}
            <div className="page-header" style={{ marginBottom: 0, paddingBottom: 0 }}>
                <h1 className="page-title">{t('alfarabi.title')}</h1>
                <p className="page-subtitle">{t('alfarabi.subtitle')}</p>
            </div>

            {/* Chat Container */}
            <div style={{
                flex: 1,
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-gray-200)',
                margin: 'var(--spacing-6) 0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
            }}>
                {/* Messages Area */}
                <div style={{
                    flex: 1,
                    padding: 'var(--spacing-6)',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-4)',
                    background: '#f8fafc'
                }}>
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            style={{
                                display: 'flex',
                                gap: 'var(--spacing-3)',
                                flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
                                alignItems: 'flex-start'
                            }}
                        >
                            {/* Avatar */}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: msg.type === 'user' ? 'var(--gradient-primary)' : '#0f766e',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                color: 'white',
                                flexShrink: 0
                            }}>
                                {msg.type === 'user' ? '👤' : botAvatar}
                            </div>

                            {/* Message Bubble */}
                            <div style={{
                                background: msg.type === 'user' ? 'var(--color-primary-600)' : 'white',
                                color: msg.type === 'user' ? 'white' : 'var(--color-gray-800)',
                                padding: '12px 16px',
                                borderRadius: '16px',
                                borderTopLeftRadius: msg.type === 'bot' ? '4px' : '16px',
                                borderTopRightRadius: msg.type === 'user' ? '4px' : '16px',
                                maxWidth: '70%',
                                boxShadow: msg.type === 'bot' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                                lineHeight: 1.5
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#0f766e', // Teal color for Al-Farabi
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                color: 'white'
                            }}>
                                {botAvatar}
                            </div>
                            <div style={{
                                background: 'white',
                                padding: '12px 16px',
                                borderRadius: '16px',
                                borderTopLeftRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <span className="typing-dot">.</span>
                                <span className="typing-dot" style={{ animationDelay: '0.2s' }}>.</span>
                                <span className="typing-dot" style={{ animationDelay: '0.4s' }}>.</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div style={{
                    padding: 'var(--spacing-4)',
                    background: 'white',
                    borderTop: '1px solid var(--color-gray-200)'
                }}>
                    <form onSubmit={handleSendMessage} style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={t('alfarabi.placeholder')}
                            style={{
                                paddingRight: '100px',
                                height: '52px',
                                borderRadius: '26px',
                                border: '1px solid var(--color-gray-300)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                position: 'absolute',
                                right: '6px',
                                top: '6px',
                                bottom: '6px',
                                background: 'var(--gradient-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '0 20px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                            disabled={!inputValue.trim()}
                        >
                            {language === 'kk' ? 'Жіберу' : 'Отправить'}
                        </button>
                    </form>
                    <div style={{
                        textAlign: 'center',
                        marginTop: '8px',
                        fontSize: '12px',
                        color: 'var(--color-gray-400)'
                    }}>
                        {t('alfarabi.disclaimer')}
                    </div>
                </div>
            </div>

            <style>{`
                .typing-dot {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    background: #94a3b8;
                    border-radius: 50%;
                    animation: typing 1.4s infinite ease-in-out both;
                }
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </div>
    )
}

export default AlFarabiBot

import slugify from "slugify";

const employeeData = [
    {
        "name": "Alex Windham",
        "position": "COO and Founder",
        "description": "For most of my life, I had been looking for someone who shared my vision of a better world. When I met Julian, I knew I was with a visionary that saw a future others couldn't. Together, we are shaping a world and life that will transcend what humans thought was possible, bridging the realms of what we see and what we can achieve.",
        "bio": "Alex Windham is a seasoned technologist with a robust track record in operational excellence and product development. With expertise spanning AI, computer vision, and biomechanics, Alex's prowess lies in translating complex technological concepts into real-world applications. Before joining Strong, he held pivotal roles at leading tech corporations, where he championed several groundbreaking initiatives. At Strong, his operational acumen ensures the company's vision is not just aspirational but grounded in reality. Alex's commitment is unwavering: creating solutions that are not just innovative but profoundly impact human lives",
        "image": "./employees/Alex_Windham_COO.png",
        "slug": slugify("Alex Windham")
        
    },
    {
        "name": "Julian Winter",
        "position": "CEO and Founder",
        "description": "I founded Strong under the belief that a world where technology amplifies our innate human capabilities is a better world. At Strong, we're making this vision a reality, ensuring that every person can leverage technology to see more, do more, and be more than they ever imagined.",
        "bio": "Julian Winter, the founder, and chief Visionary of Strong, is a trailblazer in the realm of biotechnology and computer vision. With a rich academic background that includes a PhD from Oxford, Julian has been at the helm of numerous tech innovations, from his tenure at NeuraLink to pioneering roles at Amazon. His genius lies in his ability to foresee technological trends and mold them into products that redefine industries. At Strong, Julian's leadership has been instrumental in crafting a suite of products that seamlessly blend AI and human potential, always with an ethical and humane approach at its core.",
        "image": "./employees/Julian_Winter_CEO.png",
        "slug": slugify("Julian Winter")
    },
    {
        "name": "Lara Jensen",
        "position": "Director of Computer Vision",
        "description": "Being at the forefront of AI evolution, I've always been driven by the desire to be part of revolutionary products that transcend the ordinary. At Strong, I've found the canvas to paint a world where AI doesn't just aid but leads, honestly and powerfully.",
        "bio": "Dr. Lara Jensen is a luminary in the world of computer vision and AI. A graduate from Stanford, Lara's academic prowess is only rivaled by her industry achievements. With an unwavering focus on crafting honest AI solutions, she has been instrumental in developing powerful software tools and new algorithms that are redefining the boundaries of what's possible. Lara's revolutionary deep learning diffusion models are a testament to her commitment to pushing AI into new realms. In her role as the Director of Computer Vision at Strong, she envisions a world where AI acts as our most trusted guide, offering unparalleled decision support in every facet of our lives.",
        "image": "./employees/Dr_Lara_Jensen_Director_Computer_Vision_AI.png",
        "slug": slugify("Dr Lara Jensen")

    },
    {
        "name": "Samuel Hayes",
        "position": "Chief Ethics and Data Integrity Officer",
        "description": "When Julian and Alex approached me with their vision of Strong, I was initially hesitant. The sheer scale and implications of the technology they described were overwhelming. However, as I delved deeper into their motives, their backgrounds, and their vision, it became clear that Strong wasn't just another tech venture. It was a commitment to shaping the future responsibly. With the potential of Strong to revolutionize our lives for generations to come, my role is to ensure that every step we take is ethical, honest, and with the best interests of humanity at its core.",
        "bio": "Dr. Samuel Hayes is an esteemed expert in the field of ethics, data privacy, and security. With a Ph.D. focusing on the ethical implications of large-scale data collection, he is ideally positioned to guide Strong's pioneering IoT connected surveillance initiative. Samuel has worked with numerous tech giants, advising on data privacy practices and ethical considerations, ensuring user information is not only protected but also used responsibly. At Strong, he is tasked with the paramount duty of guaranteeing that the immense power of the technology is harnessed with utmost integrity, always placing people before profit.",
        "image": "./employees/Directir_Ethics_Compliance.png",
        "slug": slugify("Samuel Hayes")
    },
    {
        "name": "Lara Kellman",
        "position": "Chief Biological Scientist",
        "description": "For years, I've observed many in the scientific community approach the future with a certain trepidation, often overshadowed by the challenges we face. When I met the team at Strong, their optimism was palpable. They didn't just see the hurdles; they envisioned the leaps we could make over them. I realized that here was a group who prioritized our collective futures, viewing it not with despair, but with hope and excitement for what we could become.",
        "bio": "Lara Kellman stands at the intersection of biology, technology, and the future. With an extensive background in physiology, biomechanics, and epidemiology, she brings a holistic perspective to the biological implications and potentials of technology. Lara's research has spanned from the intricate depths of biochemistry to the broader scopes of public health and disease prevention. At Strong, she is pioneering the concept of 'human digital twins,' aiming to bridge the digital and biological realms in ways previously unimagined. Her passion lies in ensuring that as we advance technologically, we remain rooted in and guided by a deep understanding of the human body and its vast potentials.",
        "image": "./employees/Lara_Kellman_Chief_Biological_Scientist.png",
        "slug": slugify("Lara Kellman")
    },
    {
        "name": "Marcus Vale",
        "position": "Chief Environmental Scientist",
        "description": "My journey in environmental science has been an eye-opener, showing me how we've only just begun to tap into the potential of technology in understanding and preserving our world. At Strong, I see a vision that aligns with my aspirations. We're on the brink of revolutionizing how we approach wildlife, infrastructure, societal structure, and more. I genuinely believe that our endeavors will be a game-changer for the planet.",
        "bio": "Marcus Vale is a visionary in the realm of environmental science. With a keen focus on the intersection of technology and nature, he has dedicated his career to understanding the intricacies of our planet. From studying the profound implications of climate change, predicting and mitigating natural disasters, to understanding pandemic spreads and shifting weather patterns, Marcus has been at the forefront of environmental innovation. His recent work on 'forest digital twins' aims to provide a comprehensive, real-time digital representation of our forests, shedding light on the impacts of wildfires and aiding in their prevention. At Strong, Marcus is leveraging advanced AI and data science to create solutions that not only benefit humanity but also ensure the well-being of our planet for generations to come.",
        "image": "./employees/Dr_Marcus_Vale_Chief_Environmental_Scientist.png",
        "slug": slugify("Marcus Vale")
    },
    {
        "name": "Adrian Foster",
        "position": "CTO",
        "description": "Being at the cutting edge of technology, I've always been drawn to complex challenges - especially those that push the boundaries of what software can achieve. The intricacies of latency, distributed systems, and emerging tech never cease to captivate me. It's exhilarating to be a part of Strong, a company that is not just innovating, but reshaping the future.",
        "bio": "SWith degrees from both Stanford and Harvard, his academic prowess is complemented by his practical experience at tech giants like Google and Meta. Over the years, Adrian has been instrumental in developing state-of-the-art software solutions that prioritize efficiency and user experience. His recent foray into Quantum Computing hints at his relentless pursuit of the next 'big thing' in tech. At Strong, Adrian's leadership as the CTO ensures that the company remains at the vanguard of technological innovation, setting new benchmarks for the industry.",
        "image": "./employees/CTO.png",
        "slug": slugify("")
    },
    {
        "name": "Clara Mitchell",
        "position": "CFO",
        "description": "Joining a company isn't just about crunching numbers or managing assets. It's about aligning with a vision that resonates deeply with personal beliefs. At Strong, I found a team dedicated to shaping a better future. My role? Ensuring our financial stability so that vision can be realized.",
        "bio": "Clara Mitchell brings a wealth of experience in ethical investing and wealth management to the Strong team. With a keen eye for aligning business goals with ethical standards, she has managed significant portfolios at some of the worlds largest banks and hedge funds ensuring both profitability and responsibility. Her expertise in managing ethical assets ensures that Strong not only thrives financially but does so while adhering to the highest standards of fiscal responsibility and integrity.",
        "image": "./employees/CFO.png",
        "slug": slugify("Clara Mitchell")
    },
    
]

export default employeeData;
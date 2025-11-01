// A simple object to store quiz content
const quizData = [
    {
        question: "Welcome to Javy's 22nd Birthday Game! Are you ready to play?",
        answers: {
            a: "Yes, of course!",
            b: "DEFINITELYYY",
            c: "omg yes please :D"
        }
    },
    {
        question: "Today we are going to be baking your birthday cake! First up, we will take a trip down memory lane~~ for our frist question, what would you like the base to be?",
        answers: {
            a: "Chocolate Speculoos 🍫",
            b: "Nutella Banananana 🍌",
            c: "M-Megan flavoured?? 👀"
        }
    },
    {
        question: "Next, what extra toppings would you like to throw in?",
        answers: {
            a: "BOBA TEA.",
            b: "oranges (trust me this is a good one)",
            c: "CHICKEN NUGGETS!!!"
        }
    },
    {
        question: "For our next part on things i love about Javy, what kind of qualities do you think this cake should have?",
        answers: {
            a: "VERY SWEET",
            b: "spicy 🌶️🥵",
            c: "soft uwu~~"
        }
    },
    {
        question: "What other attributes should this cake have?",
        answers: {
            a: "it has to look cuuute",
            b: "it shld be layered!",
            c: "balanced and well-rounded :)"
        }
    },
    {
        question: "hehe now we're at the next part of building the cake! so for our next question, where do you wanna eat the cake at?",
        answers: {
            a: "in the comfort of my home!",
            b: "somewhere overseas~~"
        }
    },
    {
        question: "Let's listen to a song while baking the cake! What song should we listen to? (p.s. unmute your device!)",
        answers: {
            a: "something chill and calming",
            b: "SOMETHING HYPEEEEE",
            c: "something in between!"
        }
    },
    {
        question: "NEXT SECTION: LOVE LANGUAGES <3 what help do you need/want with prepping the cake?",
        answers: {
            a: "i want you to give me some encouraging words-- KUA WOOO",
            b: "lots of huggies and kissies throughout >.<",
            c: "could you help me with mixing the ingredients? :)",
            d: "let's bake the cake together!!"
        }
    },
    {
        question: "now for a more specific GRATITUDE SECTION :D what else should we do for the cake?",
        answers: {
            a: "let's try some new baking style!",
            b: "let's show off our cake to everyone :)",
            c: "let's keep up the good work!"
        }
    },
    {
        question: "Oh no!we accidentally put the wrong ingredient in...",
        answers: {
            a: "oopsies! yea hor",
            b: "HAHAHHA ALAMAK",
            c: "uh oh..."
        }
    },
        {
        question: "Finally, looking back on some key moments...",
        answers: {
            a: "When we created the recipe",
            b: "When we bought the ingredients",
            c: "When we baked our first cake"
        }
    }
];

// Define outcomes based on user answers. Each result can include text and an optional image path.
const results = {
    a: {
        text: "Happiest of Birthdays, my love <3 Hope you enjoyed this lil' game! You deserve the world.",
        img: "images/cake1.jpg",
        audio: "audio/happybday.m4a"
    },
    b: {
        text: "WOOOO HAPPY 22ND MY POOKIEWOOKIEHOOKIELOOKIE :DDDD ",
        img: "images/cake2.jpg",
        audio: "audio/happybday.m4a"
    },
    c: {
        text: "YIPPEE wishing you the most joy and love on your special day,, happy 22nd birthday my cutie <3",
        img: "images/cake3.jpg",
        audio: "audio/happybday.m4a"
    }
};

// Helper: stop any playing audio on the page (used when navigating)
function stopAllAudio() {
    document.querySelectorAll('audio').forEach(a => {
        try {
            a.pause();
            a.currentTime = 0;
        } catch (e) {
            // ignore
        }
    });
}

// Select HTML elements
const quizDiv = document.getElementById('quiz');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressDiv = document.getElementById('progress');
const resultDiv = document.getElementById('result');

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);
let isInterstitial = false;
let currentInterstitial = null; // { qIndex, answer }

// Interstitial content you can customize per question+answer.
// Keys are question indexes. Values map answer-letter -> HTML string for the interstitial.
const interstitials = {
    0: {
        a: `<div class="interstitial"><h2>Nice!</h2><p>oKAYYY LESGOOO</p><img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGluaTNwYXF5N3FoYnh4dGF3anBhMDJ1bzNvcHQ0dDZ5cTFwZXZjOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/blSTtZehjAZ8I/giphy.gif" alt="celebrate"></div>`,
        b: `<div class="interstitial"><h2>Woo!</h2><p>that's what i like to hear! time to PARTAYYY</p><img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" alt="party"></div>`,
        c: `<div class="interstitial"><h2>Yay!</h2><p>hehehehe i'm ready too!! let's begin :D</p><img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" alt="happy"></div>`
    },
    1: {
        a: `<div class="interstitial"><h2>MMMM good idea!</h2><p>just like the cake from your first birthday that we celebrated together! 🎂</p><img src="images/cake.jpg" alt="cake"></div>`,
        b: `<div class="interstitial"><h2>yummy choice! your go-to~~</h2><p>reminds me of our goated bkk trip in jan '25 🇹🇭</p><img src="images/banana.jpg" alt="banana.jpg"></div>`,
        c: `<div class="interstitial"><h2>hmMMmmMm</h2><p>kinda interesting choice... 😇</p><img src="images/eatme.jpg" alt="eatme.jpg"></div>`
    },
    2: {
        a: `<div class="interstitial"><h2>GNARLY.</h2><p>when i think of bbt i just think about our liho adventures tgt and all the times you bought me my fave green milk tea hehe</p><img src="images/bbt.jpg" alt="bbt"></div>`,
        b: `<div class="interstitial"><h2>woah you rlly picked oranges over bbt?~~</h2><p>this reminds me of our lovely jeju trip in dec '23 when you helped me take lots of pics i picked the oranges HAHA</p><img src="images/orange.jpg" alt="orange.jpg"></div>`,
        c: `<div class="interstitial"><h2>CHICKEN NUGGETTTTSSS</h2><p>whenever i think of this i recall the scary big chicken nugget cmg for me if i dont go to bed early... and also all our late night supper runs and deliveries ofc! nomnomnom-- i couldn't find pic of our chicken nuggets so here is a pic of you sleeping in wushu room instead HAHAHA (caption so real)</p><img src="images/supper.jpg" alt="supper.jpg"></div>`
    },
    3: {
        a: `<div class="interstitial"><h2>MY SWEEEETEST BOY</h2><p>you alw treat me so well, giving me lots of compliments and alw buying me gifts '3' </p><img src="images/gift.jpg" alt="gift"></div>`,
        b: `<div class="interstitial"><h2>HOTTTIE HOTTIEE~~</h2><p>need i say more, just look at my midnight snack:</p><img src="images/snack.jpg" alt="snack.jpg"></div>`,
        c: `<div class="interstitial"><h2>my cute lil softie</h2><p>smth ive always loved is how you looked so cool and baddie (rbf), and ppl alw thought you appeared that way too, but to me you're alw a softieee hehehe i like</p><img src="images/egg.jpg" alt="egg.jpg"></div>`
    },
    4: {
        a: `<div class="interstitial"><h2></h2>DAS MY CUTIE<p>i just wanna SQUISH YOUUU</p><img src="images/shoulder.jpg" alt="shoulder"></div>`,
        b: `<div class="interstitial"><h2>layered = complex = deep~~</h2><p>smth i rlly love about our rs is when we can have deep talks where we confront our emotions and ways of thinking. it rlly helps us learn more about each other and stengthen our rs. :) </p><img src="images/deep.jpg" alt="deep.jpg"></div>`,
        c: `<div class="interstitial"><h2>my well-rounded, talented boy</h2><p>bb has been hustling so hard in sch and being an acad weapon, while being an WUSHU ZAI KIA,, sorry i mean MY wushu zai kia 🔥</p><img src="images/wushu.jpg" alt="wushu.jpg"></div>`
    },
    5: {
        a: `<div class="interstitial"><h2>you are my home.</h2><p>alw fun to just chill at home w my pooks</p><video src="images/house.MOV" muted autoplay playsinline loop style="max-width:100%;border-radius:8px"></video></div>`,
        b: `<div class="interstitial"><h2>i love seeing the world with you!</h2><p>THROWBACK TO KL!</p><video src="images/kl.MOV" muted autoplay playsinline loop style="max-width:100%;border-radius:8px"></video></div>`
    },
    6: {
        a: `<div class="interstitial"><h2>THROWBACK TO LISTENING TO THIS IN WUSHU ROOM 🗣️</h2><p>thank you for intro-ing this to me hehe</p><audio id="interstitial-audio" src="audio/walkedthruhell.mp3" preload="auto"></audio></div>`,
        b: `<div class="interstitial"><h2>THROWBACK TO LEARNING HOW TO DANCE TO THIS TGT</h2><p>"why you alw in a mood... lalalala"</p><audio id="interstitial-audio" src="audio/mood.mp3" preload="auto"></audio></div>`,
        c: `<div class="interstitial"><h2>THROWBACK TO US FALLING IN LOVE TO THIS SONG</h2><p>OXY-EMO-GLOBIN OGGGG</p><audio id="interstitial-audio" src="audio/guessiminlove.mp3" preload="auto"></audio></div>`
    },
    7: {
        a: `<div class="interstitial"><h2>words of affirmation! 🗣️</h2><p>one of the most recent and notable times when you did this EXTREMELY well was when i was training for ivp. you supported me so much, gave a lot of words of encouragement and helped me improve and accomplish things i nvr knew i could. i love you so much for this.</p><img src="images/ivp.jpg" alt="ivp"></div>`,
        b: `<div class="interstitial"><h2>physical touch uwu 💋</h2><p>i miss all your cuddles and kissies 😭</p><img src="images/taste.jpg" alt="taste.jpg"></div>`,
        c: `<div class="interstitial"><h2>acts of service 💪🏼</h2><p>you're actl the sweetest boy alw fulfilling this and helping me whenever i needed it</p><img src="images/service.jpg" alt="service.jpg"></div>`,
        d: `<div class="interstitial"><h2>quality time 🕰️</h2><p>i LOVEEE SPENDING TIME WITH YOU... every time you come over i nvr want you to leave :(</p><img src="images/egg.jpg" alt="egg.jpg"></div>`
    },
    8: {
        a: `<div class="interstitial"><h2>thank you for trying new things with me...</h2><p>even though you may be very scared or apprenhensive bout it, in the end you still do it tgt with me!</p><img src="images/coaster.jpg" alt="ivp"></div>`,
        b: `<div class="interstitial"><h2>thank you for never being afraid to show me off...</h2><p>for doing the most and letting everyone know you're mine and i'm yours :D</p><video src="images/promlift.MOV" muted autoplay playsinline loop style="max-width:100%;border-radius:8px"></video></div>`,
        c: `<div class="interstitial"><h2>my motivation</h2><p>thank you for always being my main source of motivation and for pushing me to be a better version of myself</p><img src="images/motivation.JPG" alt="motivation.jpg"></div>`,
    },
    9: {
        a: `<div class="interstitial"><h2>throwback to some of your funny, cutesy moments no. 1</h2><p><img src="images/pabo1.jpg" alt="pabo1"></div>`,
        b: `<div class="interstitial"><h2>throwback to some of your funny, cutesy moments no. 2</h2><p>HAHAHAHAHA</p><img src="images/pabo2.jpg" alt="pabo2"></div>`,
        c: `<div class="interstitial"><h2>throwback to some of your funny, cutesy moments no. 3</h2><p>you are so funny</p><img src="images/pabo3.jpg" alt="pabo3"></div>`,
    },
    10: {
        a: `<div class="interstitial"><h2>will nvr forget the first day we met...</h2><p><img src="images/met.JPG" alt="ivp"></div>`,
        b: `<div class="interstitial"><h2>when you asked me to be your girlfriend</h2><p>and i said yes!</p><img src="images/gf.jpg" alt="ivp"></div>`,
        c: `<div class="interstitial"><h2>our first proper overseas trip just the two of us!</h2><p></p><video src="images/lotte.MP4" muted autoplay playsinline loop style="max-width:100%;border-radius:8px"></video></div>`,
    }
};

function showQuestion(index) {
    // stop any audio playing from interstitials or results when showing a question
    stopAllAudio();
    const q = quizData[index];
    const answers = [];
    for (const letter in q.answers) {
        const checked = userAnswers[index] === letter ? 'checked' : '';
        answers.push(
            `<label class="answer-option">
                <input type="radio" name="question${index}" value="${letter}" ${checked}>
                ${q.answers[letter]}
            </label>`
        );
    }

    quizDiv.innerHTML = `
        <div class="question">${q.question}</div>
        <div class="answers">${answers.join('')}</div>
    `;

    // update progress and buttons
    progressDiv.textContent = `Question ${index + 1} of ${quizData.length}`;
    prevButton.disabled = index === 0;
    nextButton.textContent = index === quizData.length - 1 ? 'Finish' : 'Next';
    resultDiv.innerHTML = '';

    // attach change listeners to radios to persist selection
    const inputs = quizDiv.querySelectorAll(`input[name=question${index}]`);
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            userAnswers[index] = e.target.value;
        });
    });
}

function showInterstitial(qIndex, answerLetter) {
    // stop any audio playing when showing a new interstitial
    stopAllAudio();
    const content = (interstitials[qIndex] || {})[answerLetter];
    if (!content) return false;
    isInterstitial = true;
    currentInterstitial = { qIndex, answer: answerLetter };
    // render the interstitial HTML and small caption
    quizDiv.innerHTML = `
        <div class="interstitial-wrapper">
            ${content}
        </div>
    `;
    // after inserting the HTML
    const audioEl = quizDiv.querySelector('#interstitial-audio');
    if (audioEl) {
        // try to play — this will usually work because Next was a user gesture
        audioEl.volume = 0.9; // optional
        const playPromise = audioEl.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
            // autoplay blocked or other error — show a small play button fallback
            console.warn('Audio play prevented:', err);
            // Create a visible play control for the user
            const btn = document.createElement('button');
            btn.textContent = 'Play audio';
            btn.className = 'audio-play-fallback';
            btn.addEventListener('click', () => {
                audioEl.play().catch(()=>{/* ignore */});
                btn.remove();
            });
            quizDiv.querySelector('.interstitial-wrapper').appendChild(btn);
            });
        }
    }
    progressDiv.textContent = ` `;
    prevButton.disabled = false; // allow going back to the question
    nextButton.textContent = 'Continue';
    resultDiv.innerHTML = '';
    return true;
}

function showResult() {
    // stop any playing audio before showing results
    stopAllAudio();
    const scores = { a: 0, b: 0, c: 0 };
    userAnswers.forEach(ans => {
        if (ans) scores[ans]++;
    });
    const highestScore = Math.max(...Object.values(scores));
    const finalResult = Object.keys(scores).find(key => scores[key] === highestScore) || 'a';
    // Support image in result if provided
    const res = results[finalResult];
    const imgHtml = res && res.img ? `<img class="result-img" src="${res.img}" alt="result image">` : '';
    const audioHtml = res && res.audio ? `<audio id="result-audio" src="${res.audio}" preload="auto"></audio>` : '';
    const text = res && res.text ? res.text : (typeof results[finalResult] === 'string' ? results[finalResult] : '');
    resultDiv.innerHTML = `<h2>Your result</h2>${imgHtml}${audioHtml}<p>${text}</p>`;

    // Attempt to autoplay result audio (user already clicked to finish)
    const audioEl = resultDiv.querySelector('#result-audio');
    if (audioEl) {
        audioEl.volume = 0.9;
        const p = audioEl.play();
        if (p && typeof p.catch === 'function') {
            p.catch(err => {
                console.warn('Result audio playback prevented:', err);
                const btn = document.createElement('button');
                btn.textContent = 'Play song';
                btn.className = 'audio-play-fallback';
                btn.addEventListener('click', () => {
                    audioEl.play().catch(()=>{});
                    btn.remove();
                });
                resultDiv.appendChild(btn);
            });
        }
    }
}

prevButton.addEventListener('click', () => {
    if (isInterstitial) {
        // go back to the originating question
        isInterstitial = false;
        currentInterstitial = null;
        showQuestion(currentQuestion);
        return;
    }
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

nextButton.addEventListener('click', () => {
    // If currently viewing an interstitial, move to the next question
    if (isInterstitial) {
        isInterstitial = false;
        currentInterstitial = null;
        // advance to next question after the question that produced the interstitial
        if (currentQuestion === quizData.length - 1) {
            showResult();
            return;
        }
        currentQuestion++;
        showQuestion(currentQuestion);
        return;
    }

    // If user selected an answer and there's an interstitial for it, show it instead of immediately advancing
    const selected = userAnswers[currentQuestion];
    if (selected) {
        const shown = showInterstitial(currentQuestion, selected);
        if (shown) return; // interstitial displayed; wait for the user to Continue
    }

    // If on last question, finish
    if (currentQuestion === quizData.length - 1) {
        showResult();
        return;
    }

    // advance to next question
    currentQuestion++;
    showQuestion(currentQuestion);
});

// Initialize the quiz by showing the first question
showQuestion(0);

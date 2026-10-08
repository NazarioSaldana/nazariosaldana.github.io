// All of the site's content lives here, so updating the portfolio
// usually means editing this file and nothing else.

export const profile = {
  name: 'Nazario Saldaña',
  firstName: 'Nazario',
  email: 'nazariosaldana@utexas.edu',
  linkedin: 'https://www.linkedin.com/in/nazariosaldana',
  github: 'https://github.com/NazarioSaldana',
  resume: 'resume.pdf',
  location: 'Austin, TX',
  school: 'UT Austin · ECE · Class of 2028',
}

// The hero line cycles through these: "I build ___"
export const buildWords = [
  'firmware',
  'custom PCBs',
  'games on microcontrollers',
  'assemblers & simulators',
  'community',
]

export const about = [
  "I'm Nazario, a Houston native, a first-generation Hispanic college student, and an Electrical & Computer Engineering student at UT Austin.",
  "I love embedded systems because that's where code meets the physical world. The fun part for me is the messy middle: getting firmware, circuits, and real sensors to cooperate.",
  'Growing up, I learned the value of hard work, the importance of community, and the resilience that comes from pride in my Mexican heritage. That shows up in everything I build and every team I join.',
]

// "Off the clock" cards. Swap these for whatever you're into!
// `icon` is a key from src/art/icons.js
export const interests = [
  {
    icon: 'ball',
    title: 'FC Barcelona',
    text: "Blaugrana through and through. I've been a culer since [how/when you got hooked], and [favorite player] is still my all-time favorite. Match days mean [how you watch, e.g. early kickoffs with café de olla]. Visca el Barça!",
  },
  {
    icon: 'flag',
    title: 'Mexican heritage',
    text: 'Family, food, and cultura. Being first-gen is a big part of why I do what I do.',
  },
  {
    icon: 'screwdriver',
    title: 'Taking things apart',
    text: 'If it has a circuit board, I want to know how it works (and whether I can make my own).',
  },
  {
    icon: 'invader',
    title: 'Retro games',
    text: 'So much so that I built Space Invaders on a microcontroller. You can play it in the Arcade tab.',
  },
  {
    icon: 'handHeart',
    title: 'Paying it forward',
    text: "Mentoring first-years and running SHPE events. Somebody helped me, so I'm helping the next person.",
  },
  {
    icon: 'hat',
    title: 'Houston ↔ Austin',
    text: "H-Town raised, Austin based. I'm always happy to argue about the best taco spot.",
  },
]

// The "Right now" board
export const now = [
  { verb: 'Building', what: 'A wearable fitness tracker with a custom PCB, BLE streaming, and a native iOS app' },
  { verb: 'Writing', what: 'An LC-3b assembler plus instruction- and microarchitecture-level simulators in C' },
  { verb: 'Leading', what: 'Project Development for SHPE UT Austin, including a yearly Makeathon with Microsoft' },
  { verb: 'Flashing', what: 'Dual-actuator control firmware for the ASCEND ATV team' },
  { verb: 'Learning', what: 'From corporate leaders as 1 of 38 students in Dell Technologies STEM Aspire' },
  { verb: 'Mentoring', what: '8 first-year Ramshorn Scholars through their transition into college' },
]

export const projects = [
  {
    id: 'tracker',
    title: 'Wearable Fitness Tracker',
    status: 'In progress',
    tech: 'C, BLE, KiCad',
    description: 'A wrist-worn tracker that streams heart rate, SpO2, and motion data over BLE to a native iOS app.',
    fullDetails:
      'A from-scratch wearable: a custom PCB, sensor integration, low-power firmware, and a phone app to show it all. The heart-rate widget at the top of this site is a nod to it.',
    process:
      'Integrated heart rate, SpO2, and a 6-axis motion sensor for continuous physiological and motion data. Writing custom C firmware for real-time signal processing and low-power BLE streaming on a compact Li-Po cell. Designed a custom PCB covering power management and sensor routing, and building a native iOS app that receives and displays heart rate, activity, and other health metrics.',
    skills: ['Embedded C', 'BLE', 'PCB Design (KiCad)', 'Power Management', 'Signal Processing', 'iOS'],
    icon: '💓',
  },
  {
    id: 'lc3b',
    title: 'LC-3b Machine Architecture',
    status: 'In progress',
    tech: 'C, Computer Architecture',
    description: 'A two-pass assembler, an instruction-level simulator, and a microcoded microarchitecture simulator for the LC-3b ISA.',
    fullDetails:
      'The full journey from assembly source to machine code to a cycle-by-cycle model of the hardware that runs it.',
    process:
      'Developed a two-pass assembler that translates LC-3b assembly into machine language. Designed an instruction-level simulator that models the LC-3b and executes the assembled code. Now engineering a microarchitecture-level simulator by writing custom microcode to execute each LC-3b instruction.',
    skills: ['C', 'Assemblers', 'ISA Design', 'Microcode', 'Simulation'],
    icon: '🧮',
  },
  {
    id: 'atv',
    title: 'ASCEND ATV Embedded Firmware',
    status: 'Ongoing',
    tech: 'Raspberry Pi, Embedded Control',
    description: 'Firmware for synchronized dual-actuator control, calibrated to keep the hardware from damaging itself.',
    fullDetails:
      'An embedded control system for high-torque linear actuators, powered by a Raspberry Pi.',
    process:
      'Developed firmware for synchronized dual-actuator control that prevents hardware damage through system calibration. Created detailed wiring schematics and calibration documentation to streamline debugging across the team. Implemented a closed-loop switch as a hardware safety method to prevent electrical failure.',
    skills: ['Raspberry Pi', 'Closed-loop Control', 'System Calibration', 'Schematic Design'],
    mediaType: 'video',
    youtubeId: '5Vr-ZNbFy8g',
  },
  {
    id: 'invaders',
    title: 'Space Invaders on MSPM0G3507',
    tech: 'C, Game Programming',
    description: 'A real-time game on a microcontroller with interrupt-driven input, custom sprites, and DAC audio.',
    fullDetails:
      'A fully functional arcade clone running on bare-metal microcontroller hardware, with all graphics, sound, and game logic written in C. (There’s a web remake in the Arcade tab.)',
    process:
      'Used interrupt system logic for real-time input, custom graphics, and audio. Wrote modular firmware covering collision detection, event timing, and a real-time score system. The spaceship moves on a 128×160 ST7735 LCD, controlled with a slide potentiometer as analog input, with 12-bit DAC playback for sound and UART for debugging.',
    skills: ['Embedded C', 'ISRs', 'ADC / DAC', 'UART / SPI', 'Driver Development'],
    mediaType: 'video',
    youtubeId: 'lTtsTbqW0g0',
  },
]

export const stats = [
  { value: 100, suffix: '+', label: 'SHPE members mentored through Manitos & Manitas' },
  { value: 20, suffix: '+', label: 'events organized for SHPE UT Austin' },
  { value: 25, suffix: '%', label: 'membership growth as Recruitment & Retention Co-Chair' },
  { value: 38, prefix: '1 of ', label: 'students selected for Dell STEM Aspire' },
]

export const leadership = [
  {
    org: 'Society of Hispanic Professional Engineers',
    role: 'Project Development Chair',
    dates: 'May 2026 – Now',
    current: true,
    points: [
      'Created 9+ project events that build technical skills across every engineering discipline',
      'Hosted 5+ industry panels to open up networking and recruiting for members',
      'Worked with corporate sponsors on 3+ events, including a yearly Makeathon with Microsoft',
    ],
  },
  {
    org: 'Dell Technologies STEM Aspire',
    role: 'Participant',
    dates: 'Aug 2026 – Now',
    current: true,
    points: [
      'Selected as 1 of 38 students to accelerate career readiness and professional growth',
      '1:1 mentorship and career coaching with corporate leaders',
      'Industry workshops, networking, and site visits',
    ],
  },
  {
    org: 'Ramshorn Scholars',
    role: 'Academic Coach',
    dates: 'Aug 2025 – Now',
    current: true,
    points: [
      'Mentoring 8 first-year Ramshorn Scholars through the academic, social, and personal jump to college',
      'Tutoring tough subjects and building better study strategies',
      'Reviewing resumes and connecting students with networking opportunities',
    ],
  },
  {
    org: 'Society of Hispanic Professional Engineers',
    role: 'Recruitment & Retention Co-Chair',
    dates: 'May 2025 – May 2026',
    points: [
      'Organized 15+ events, including a themed cookout that raised member interaction by 28%',
      'Grew membership by 25% through outreach and an inclusive environment',
      'Led Manitos & Manitas mentorship for 100+ members, boosting new-member activity 50% YoY',
    ],
  },
]

export const toolbox = [
  { group: 'Languages', items: ['C / C++', 'ARM Assembly', 'Verilog', 'Python', 'Java'] },
  { group: 'Software', items: ['VS Code', 'Xilinx Vivado', 'KiCad', 'LTspice', 'MATLAB'] },
  { group: 'Hardware', items: ['Oscilloscope', 'Microcontrollers', 'Raspberry Pi', 'Arduino', 'FPGA', 'Soldering Iron'] },
]

export const honors = [
  'Ramshorn Scholar',
  'HSF Scholar',
  'University Leadership Network Scholar',
  'Cockrell Engineering Scholarship',
]

export const coursework = ['Computer Architecture', 'Embedded Systems', 'Digital Logic Design', 'Circuit Theory', 'Algorithms']

import { useState, useEffect, useRef } from "react"

export default function PCSetup() {
  const [isPoweredOn, setIsPoweredOn] = useState(false)
  const [hackingLines, setHackingLines] = useState([])
  const intervalRef = useRef(null)

  const togglePower = () => {
    setIsPoweredOn(!isPoweredOn)
  }

  // Generate random hex and octal numbers for the hacking effect
  useEffect(() => {
    if (isPoweredOn) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      // Initialize with a few lines
      const initialLines = Array(5)
        .fill("")
        .map(() => generateRandomCodeLine())
      setHackingLines(initialLines)

      // Add new lines periodically
      intervalRef.current = setInterval(() => {
        setHackingLines((prev) => {
          const newLines = [...prev, generateRandomCodeLine()]
          // Keep only the last 12 lines to prevent too many lines
          return newLines.slice(-12)
        })
      }, 500)
    } else {
      // Clear interval when powered off
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setHackingLines([])
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPoweredOn])

  // Generate a random code line with hex or octal numbers
  const generateRandomCodeLine = () => {
    const isHex = Math.random() > 0.5
    const prefix = isHex ? "0x" : "0o"
    const length = Math.floor(Math.random() * 8) + 4
    let result = prefix

    if (isHex) {
      // Generate hex digits (0-9, a-f)
      for (let i = 0; i < length; i++) {
        const hexDigit = Math.floor(Math.random() * 16).toString(16)
        result += hexDigit
      }
    } else {
      // Generate octal digits (0-7)
      for (let i = 0; i < length; i++) {
        const octalDigit = Math.floor(Math.random() * 8).toString(8)
        result += octalDigit
      }
    }

    // Add some programming-like keywords occasionally
    const keywords = ["const", "let", "function", "return", "await", "async", "import", "export", "class"]
    if (Math.random() > 0.7) {
      const keyword = keywords[Math.floor(Math.random() * keywords.length)]
      return `${keyword} ${result} = ${prefix}${Math.floor(Math.random() * 1000).toString(isHex ? 16 : 8)};`
    }

    return result + (Math.random() > 0.5 ? ";" : "")
  }

  // Function to render keyboard keys to avoid repetition
  const renderKey = (key, width, isSpecial = false, uniqueId) => {
    return (
      <div
        key={uniqueId}
        className={`${width} h-8 rounded-md ${
          isSpecial ? "bg-gradient-to-br from-pink-200 to-purple-200" : "bg-gradient-to-br from-pink-100 to-purple-100"
        } flex items-center justify-center text-xs font-medium text-gray-700 shadow-sm 
        border border-pink-200 hover:from-pink-300 hover:to-purple-300 transition-colors cursor-pointer`}
      >
        {key}
      </div>
    )
  }

  // Arrays for keyboard keys
  const functionKeys = ["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"]
  const numberKeys = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="]
  const qwertyKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"]
  const asdfKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"]
  const zxcvKeys = ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]
  const specialKeys = ["Ctrl", "Fn", "Win", "Alt"]
  const arrowKeys = ["←", "↑", "↓", "→"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-4 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg blur-xl opacity-50"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-xl border border-pink-200">
          {/* Desktop */}
          <div className="flex flex-col items-center">
            <div
              className="relative cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              onClick={togglePower}
            >
              {/* Monitor frame */}
              <div className="w-64 h-40 md:w-80 md:h-56 bg-gray-800 rounded-lg p-2 shadow-lg">
                {/* Screen */}
                <div
                  className={`w-full h-full rounded overflow-hidden ${
                    isPoweredOn ? "bg-gradient-to-br from-pink-400 via-purple-500 to-pink-500" : "bg-gray-900"
                  }`}
                >
                  {isPoweredOn ? (
                    <div className="w-full h-full flex flex-col items-start justify-start p-4 overflow-hidden font-mono text-xs text-white/90">
                      <div className="mb-2 text-pink-200">💖 Princess Hacker Mode Activated! ✨</div>
                      {hackingLines.map((line, index) => (
                        <div key={`line-${index}-${Date.now()}`} className="whitespace-nowrap mb-1 animate-pulse">
                          {line}
                        </div>
                      ))}
                      <div className="animate-pulse text-pink-200">_</div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-500 text-sm">💻 Click to power on ✨</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stand */}
              <div className="w-10 h-8 bg-gray-700 mx-auto rounded-b-lg"></div>
              <div className="w-24 h-2 bg-gray-700 mx-auto rounded-lg"></div>
            </div>

            {/* Power button with glow effect */}
            <div
              className={`mt-2 w-3 h-3 rounded-full transition-all duration-300 ${
                isPoweredOn ? "bg-pink-500 animate-pulse shadow-lg shadow-pink-500/50" : "bg-gray-400"
              }`}
            ></div>
          </div>

          {/* Keyboard and Mouse Container */}
          <div className="flex justify-center mt-6 md:mt-8 gap-4 md:gap-8 flex-wrap">
            {/* Keyboard */}
            <div className="bg-gray-100 p-2 md:p-3 rounded-lg shadow-md border border-pink-100 max-w-full overflow-x-auto">
              {/* Top row - Function keys */}
              <div className="flex gap-1 mb-1 flex-wrap">
                {functionKeys.map((key, index) => renderKey(key, "w-6", true, `fn-${index}`))}
              </div>

              {/* Number row */}
              <div className="flex gap-1 mb-1 flex-wrap">
                {numberKeys.map((key, index) => renderKey(key, "w-8", false, `num-${index}`))}
                {renderKey("⌫", "w-12", true, "backspace")}
              </div>

              {/* QWERTY row */}
              <div className="flex gap-1 mb-1 flex-wrap">
                {renderKey("Tab", "w-12", true, "tab")}
                {qwertyKeys.map((key, index) => renderKey(key, "w-8", false, `qwerty-${index}`))}
              </div>

              {/* ASDF row */}
              <div className="flex gap-1 mb-1 flex-wrap">
                {renderKey("Caps", "w-14", true, "caps")}
                {asdfKeys.map((key, index) => renderKey(key, "w-8", false, `asdf-${index}`))}
                {renderKey("Enter", "w-14", true, "enter")}
              </div>

              {/* ZXCV row */}
              <div className="flex gap-1 mb-1 flex-wrap">
                {renderKey("Shift", "w-14", true, "shift-left")}
                {zxcvKeys.map((key, index) => renderKey(key, "w-8", false, `zxcv-${index}`))}
                {renderKey("Shift", "w-14", true, "shift-right")}
              </div>

              {/* Bottom row */}
              <div className="flex gap-1 flex-wrap">
                {specialKeys.map((key, index) => renderKey(key, "w-8", true, `special-${index}`))}
                {/* Space bar */}
                {renderKey("Space ♡", "w-32", false, "space")}
                {specialKeys
                  .slice(2)
                  .reverse()
                  .map((key, index) => renderKey(key, "w-8", true, `rev-special-${index}`))}
                {arrowKeys.map((key, index) => renderKey(key, "w-6", false, `arrow-${index}`))}
              </div>
            </div>

            {/* Mouse */}
            <div className="relative">
              <div className="w-16 h-28 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-md border border-pink-200 flex flex-col items-center cursor-pointer hover:from-pink-200 hover:to-purple-200 transition-colors">
                {/* Scroll wheel */}
                <div className="w-4 h-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mt-6 border border-pink-200"></div>

                {/* Mouse buttons */}
                <div className="absolute top-0 left-0 right-0 h-12 flex">
                  <div className="w-1/2 h-full rounded-tl-3xl border-r border-pink-200 hover:bg-pink-200/30 transition-colors cursor-pointer"></div>
                  <div className="w-1/2 h-full rounded-tr-3xl hover:bg-pink-200/30 transition-colors cursor-pointer"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <div className="w-8 h-1 bg-pink-300/50 rounded-full"></div>
                </div>
              </div>

              {/* Mouse cable */}
              <div className="w-1 h-12 bg-gradient-to-r from-pink-200 to-purple-200 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
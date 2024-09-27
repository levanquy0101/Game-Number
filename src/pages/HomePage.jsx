import { useEffect, useState } from "react";

function HomePage(props) {
    const [points, setPoints] = useState(0);
    const [numbers, setNumbers] = useState([]);
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [isLost, setIsLost] = useState(false);
    const [positions, setPositions] = useState({}); // Thay đổi từ null thành một đối tượng

    // Hàm để đếm thời gian
    useEffect(() => {
        let timer;
        if (isPlaying) {
            // Bắt đầu đếm thời gian
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 100);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isPlaying]);

    const handleChangePoints = (e) => {
        const value = parseInt(e.target.value, 10);
        setPoints(value);
    };

    const handleClickButton = () => {
        if(points > 0 && points <= 10000){
            setTime(0)
            setIsPlaying(true);
            setIsWin(false);
            setIsLost(false);
            const numbers = Array.from({ length: points }, (_, index) => index + 1);
            setNumbers(numbers);
    
            // Tạo vị trí ngẫu nhiên cho mỗi số
            const newPositions = {};
            numbers.forEach((num) => {
                newPositions[num] = {
                    top: `${Math.floor(Math.random() * 90)}%`,
                    left: `${Math.floor(Math.random() * 90)}%`,
                };
            });
            setPositions(newPositions);
        }
    };

    const handleClickPoint = (num) => {
        if (!isLost && num === numbers[0]) {

            const result = numbers.filter(item => item !== num);
            if (result.length === 0) {
                setIsWin(true);
                setIsPlaying(false)
            }
            setNumbers(result)
        } else {
            setIsWin(false);
            setIsLost(true);
            setIsPlaying(false)

        }
        console.log(num)
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="grid gap-4 border border-solid w-full max-w-2xl p-4 rounded">
                {isWin && <h2 className="text-green-500 uppercase">All Cleared</h2>}
                {isLost && <h2 className="text-red-500 uppercase">Game over</h2>}
                {!isWin && !isLost && <h2 className="text-black uppercase">Let's Play</h2>}
                <div className="grid grid-cols-2 w-3/4">
                    <p className="">Points: </p>
                    <input
                        type="number"
                        value={points}
                        onChange={(e) => handleChangePoints(e)}
                    />
                    <p>Time: </p>
                    <time>{(time / 10).toFixed(1)}s</time>
                </div>
                <button className="max-w-16" onClick={handleClickButton}>
                    {isPlaying || isLost || isWin ? "Restart" : "Play"}
                </button>
                <small className="text-red-400">{(points === 0 || points > 10000) && isPlaying ? "Please choose a large number 0 and less than 10000":""}</small>
                <div className="w-full p-2 border border-solid min-h-[400px] relative">
                    {numbers.map((num) => (
                        <button
                            key={num}
                            className="absolute list-none p-2 min-w-10 rounded-full aspect-square"
                            style={{
                                position: "absolute",
                                top: positions[num]?.top,
                                left: positions[num]?.left,
                            }}
                            onClick={(e) => handleClickPoint(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;

import { useState } from "react";

function HomePage(props) {
    const [points, setPoints] = useState(0);
    const [numbers, setNumbers] = useState([]);
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [isLost, setIsLost] = useState(false);
    const [positions, setPositions] = useState({}); // Thay đổi từ null thành một đối tượng

    const handleChangePoints = (e) => {
        const value = parseInt(e.target.value, 10);
        setPoints(value);
    };

    const handleClickButton = () => {
        setIsPlaying(true);
        setIsWin(false);
        setIsLost(false);
        const numbers = Array.from({ length: points }, (_, index) => index + 1);
        setNumbers(numbers);

        // Tạo vị trí ngẫu nhiên cho mỗi số
        const newPositions = {};
        numbers.forEach((num) => {
            newPositions[num] = {
                top: Math.random() * 90 + "%",
                left: Math.random() * 90 + "%",
            };
        });
        setPositions(newPositions);
    };

    const handleClickPoint = (num) => {
        if( !isLost && num === numbers[0]) {
            const result = numbers.filter(item => item !== num);
            console.log(result)
            console.log(result.length)
            if(result.length === 0){
                setIsWin(true);
            }
            setNumbers(result)
        }else{
            setIsWin(false);
            setIsLost(true);

        }
        console.log(num)
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="grid gap-4 border border-solid w-full max-w-2xl p-4 rounded">
                <h2>{isWin ? "Bạn đã thắng" : ""}</h2>
                <h2>{isLost ? "Bạn đã thua" : ""}</h2>
                <div className="grid grid-cols-2 w-3/4">
                    <p className="">Points: </p>
                    <input
                        type="number"
                        value={points}
                        onChange={(e) => handleChangePoints(e)}
                    />
                    <p>Time: </p>
                    <time>{time}s</time>
                </div>
                <button className="max-w-16" onClick={handleClickButton}>
                    Play
                </button>
                <div className="w-full border border-solid min-h-[400px] relative bg-gray-50">
                    {numbers.map((num) => (
                        <button
                            key={num}
                            className="absolute list-none bg-blue-200 p-2 min-w-10 rounded-full aspect-square"
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

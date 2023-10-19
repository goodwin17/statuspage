import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";

export default function UptimeChart({
    width = '100%',
    height = '2rem',
    uptimeData
}) {
    // uptimeDay = {
    //     date: "",
    //     value: #
    // };
    
    let [rectWidth, setRectWidth] = useState(0);
    let [rectInterval, setRectInterval] = useState(0);

    const calculateRectPosition = (containerWidth, rectNumber, ratio) => {
        let interval = containerWidth / ((rectNumber - 1) + rectNumber * ratio);
        let width = ratio * interval;
        return [width, interval];
    }

    const parseSize = (size) => {
        let clearSize = '';
        let unit = '';
        let i = 0;

        for (i = 0; i < size.length; i++) {
            if (size[i].toLowerCase() !== size[i].toUpperCase() || size[i] === '%') {
                break;
            }

            clearSize += size[i];
        }

        while (i < size.length) {
            unit += size[i];
            i += 1;
        }

        return [Number(clearSize), unit];
    }

    const clearSize = (size) => {
        let [clear, unit] = parseSize(size);
        return clear;
    }

    useEffect(() => {
        let [rectWidth, rectInterval] = calculateRectPosition(clearSize(width), uptimeData.length, 1.4);
        setRectWidth(rectWidth);
        setRectInterval(rectInterval);
    }, []);

    return (
        <div style={{width: width, height: height }}>
            <svg width='100%' height='100%'>
                {uptimeData.map((el, i) => (
                    <Tooltip key={i} arrow placement="top" title={
                        <div>
                            <div style={{fontSize: '0.9rem', color: '#dddddd'}}>{el.date}</div>
                            <div style={{fontSize: '1.15rem', fontWeight: '400'}}>{el.value}%</div>
                        </div>
                    }>
                        <rect
                            x={`${(rectWidth + rectInterval) * i}%`}
                            width={`${rectWidth}%`}
                            height='100%'
                            fill='#00d200'
                            fillOpacity={el.value === 100 ? 1 : 0.4}
                            rx={4}
                            ry={4}
                        />
                    </Tooltip>
                ))}
            </svg>
        </div>
    );
}

import { useEffect, useState } from "react";

interface PageViewBlockprops {
    num: number,
    max:number,
    min:number,
}

export function PageViewBlock({num, max, min}:PageViewBlockprops) {
    const [pageviews, setPageViews] = useState(min);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setPageViews((prevViews) => {
          const newViews = prevViews + Math.floor(Math.random() * num);                                   // Increase by a random number up to 100
          return newViews > max ? min : newViews;                                                         // Reset to 10,000 if it exceeds 20,000
        });
      }, 2000);                                                                                           // Update every second (adjust as needed)
  
      return (() => clearInterval(interval));                                                             // Clean up the interval on component unmount
    }, [])
    return(
        <div>{pageviews}</div>
    )

}
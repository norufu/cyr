export default function Icon({s, clickHandler, iconType}) {
    return (
        <img src={s} onClick={() => clickHandler(iconType)} />  
    );
  }
  
export interface ThemeConfig {
    base?: {
        "font-family"?: string;
        "font-size"?: string;
        "background-color"?: string;
    };
    bubble?: {
        "b-c-padding"?: string;
        "b-c-background-color"?: string;
        "b-c-border-radius"?: string;
    };
    conversation?: {
        'c-s-width'?: string;
        'c-s-padding'?: string;
        'c-s-n-width'?: string;
        'c-s-n-height'?: string;
        'c-s-n-padding'?: string;
        'c-s-n-margin'?: string;
        'c-s-n-border-radius'?: string;
        'c-i-padding'?: string;
        'c-i-border-radius'?: string;
        'c-i-n-m-width'?: string;
        'c-i-n-line-height'?: string;
        'c-i-a-color'?: string;
        'c-i-a-b-shadow'?: string;
        'c-i-a-background-color'?: string;
    };
    sender?: {
        's-i-w-padding'?: string;
        's-i-w-border-radius'?: string;
        's-i-w-box-shadow'?: string;
        's-i-w-border-width'?: string;
        's-i-w-border-color'?: string;
        's-i-height'?: string;
        's-i-color'?: string;
        's-i-line-height'?: string;
        's-i-font-size'?: string;
        's-i-padding'?: string;
        's-p-d-bg-image'?: string;
        's-p-a-bg-image'?: string;
        's-b-pending-background-bg'?: string;
        's-b-pending-background-width'?: string;
        's-b-pending-background-height'?: string;
        's-b-pending-bg'?: string;
        's-b-pending-width'?: string;
        's-b-pending-height'?: string;
        's-b-pending-inner-width'?: string;
        's-b-pending-inner-height'?: string;
    };
    welcome?: {
        'w-b-radius'?: string;
        'w-background'?: string;
        'w-padding'?: string;
        'w-margin'?: string;
        'w-width'?: string;
        'w-t-color'?: string;
        'w-t-font-weight'?: string;
        'w-t-font-size'?: string;
        'w-t-line-height'?: string;
        'w-t-margin-bottom'?: string;
        'w-d-color'?: string;
        'w-d-font-weight'?: string;
        'w-d-font-size'?: string;
        'w-d-line-height'?: string;
        'w-d-margin-bottom'?: string;
        'w-p-t-color'?: string;
        'w-p-t-font-weight'?: string;
        'w-p-t-font-size'?: string;
        'w-p-t-line-height'?: string;
        'w-p-t-margin-bottom'?: string;
        'w-p-i-border-radius'?: string;
        'w-p-i-background'?: string;
        'w-p-i-color'?: string;
        'w-p-i-font-weight'?: string;
        'w-p-i-font-size'?: string;
        'w-p-i-line-height'?: string;
        'w-p-i-padding'?: string;
        'w-p-i-margin-bottom'?: string;
        'w-p-i-hover-background'?: string;
    };
    header?: {
        width?: string;
        height?: string;
        bg?: string;
        "border-bottom"?: string;
        "font-size"?: string;
        "color"?: string;
    };
}

export const themeConfigDefault = {
    base: {
        "font-family": "PingFangSC-Regular",
        "font-size": "12px",
        "b-background": "#fff"
    },
    bubble: {
        "b-c-padding": "10px 16px",
        "b-c-background-color": "#f5f5f5",
        "b-c-border-radius": "1em",
    },
    conversation: {
        'c-s-width': '240px',
        'c-s-padding': '8px 20px',
      
        'c-s-n-width': '.5em',
        'c-s-n-height': '40px',
        'c-s-n-padding': '6px 10px',
        'c-s-n-margin': '20px auto',
        'c-s-n-border-radius': '10px',
      
        'c-i-padding': '0.5rem',
        'c-i-border-radius': '0.375rem',
        'c-i-n-m-width': '160px',
        'c-i-n-line-height': '24px',
        'c-i-a-color': '#333',
        'c-i-a-b-shadow': '0 5px 10px 1px #b8d1f319',
        'c-i-a-background-color': '#dcdbe8',
    },
    sender: {
        's-i-w-padding': '.6em',
        's-i-w-bg': 'rgb(255, 255, 255)',
        's-i-w-border-radius': '.5em',
        's-i-w-box-shadow': '0px 5px 10px 1px rgba(184, 209, 243, 0.1)',
        's-i-w-border-width': '1px',
        's-i-w-border-color': 'rgba(44, 128, 248, 1)',
      
        's-i-height': '2.25em',
        's-i-color': 'rgba(55, 65, 81, 1)',
        's-i-line-height': '1.25em',
        's-i-font-size': '.875em',
        's-i-padding': '.5em 4em .5em 1.5em',
      
        's-p-d-bg-image': 'url(../../assets/send-default.svg)',
        's-p-a-bg-image': 'url(../../assets/send-can.svg)',
      
        's-b-pending-background-bg': 'rgba(0, 110, 255, 0.2)',
        's-b-pending-background-width': '2em',
        's-b-pending-background-height': '2em',
      
        's-b-pending-bg': 'linear-gradient(90.00deg, rgb(133, 104, 254), rgb(44, 128, 248) 100%)',
        's-b-pending-width': '2em',
        's-b-pending-height': '2em',
      
        's-b-pending-inner-width': '.6em',
        's-b-pending-inner-height': '.6em'
    },
    welcome: {
        'w-b-radius': '0.5em',
        'w-background': 'linear-gradient(122.16deg, #f1e7fc 0%, #cfe3ff 100%)',
        'w-padding': '1.25em',
        'w-margin': '1em',
        'w-width': 'calc(100% - 2em)',
        'w-t-color': '#111111',
        'w-t-font-weight': 'bold',
        'w-t-font-size': '18px',
        'w-t-line-height': '26px',
        'w-t-margin-bottom': '8px',
        'w-d-color': '#333',
        'w-d-font-weight': '600',
        'w-d-font-size': '14px',
        'w-d-line-height': 'normal',
        'w-d-margin-bottom': '14px',
        'w-p-t-color': '#666',
        'w-p-t-font-weight': 'regular',
        'w-p-t-font-size': '12px',
        'w-p-t-line-height': '18px',
        'w-p-t-margin-bottom': '8px',
        'w-p-i-border-radius': '4px',
        'w-p-i-background': '#fff',
        'w-p-i-color': '#333',
        'w-p-i-font-weight': 'regular',
        'w-p-i-font-size': '14px',
        'w-p-i-line-height': '20px',
        'w-p-i-padding': '10px 12px',
        'w-p-i-margin-bottom': '12px',
        'w-p-i-hover-background': '#f6f7f8',
    },
    header: {
        width: '100%',
        height: '4em',
        bg: '#fff',
        "border-bottom": '1px solid #333',
        "font-size": '1.5em',
        "color": "#000"
    }
}
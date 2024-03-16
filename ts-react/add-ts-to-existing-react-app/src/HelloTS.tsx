type HelloTSProps = {       // custom type HelloTSProps, custom HelloTS.tsx component - suck it from App.tsx
    name: string,           // name props
};

function HelloTS(props: HelloTSProps) {
    return <h1>Hello, {props.name}</h1>
}

export default HelloTS;
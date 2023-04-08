export enum IssueType {
    NoIssue = "No Issue",
    MissingEquation = "Missing Equation",
    InvalidEquation = "Invalid Equation",
    ScaleToSmall = "Scale must be greater than 0"
}

export enum CalculateMethod {
    MRAM = "MRAM",
    RRAM = "RRAM",
    LRAM = "LRAM",
    TRULE = "Trapezoid rule"
}

export class GraphInfo {
    function: string;
    scale: number = 10;
    speed: number;
    animate: boolean;
    findArea: boolean;
    findAreaMethod: CalculateMethod;
    startX: number;
    endX: number;
    stepAmount: number;
    extraFeatures = false;
    quadValues = [0, 0, 0];
    private readonly onChange: () => void;

    constructor(
        fun: string,
        scale: number,
        animate: boolean,
        animateSpeed: number,
        findArea: boolean,
        findAreaMethod: CalculateMethod,
        startX: number,
        endX: number,
        stepAmount: number,
        onChange: () => void)
    {
        this.onChange = onChange;
        this.function = fun;
        this.scale = scale
        this.animate = animate;
        this.speed = animateSpeed;
        this.findArea = findArea;
        this.findAreaMethod = findAreaMethod;
        this.startX = startX;
        this.endX = endX;
        this.stepAmount = stepAmount;
    };

    static cloneFromInstance(instance: GraphInfo): GraphInfo {
        const newInstance = new GraphInfo(
            instance.function,
            instance.scale,
            instance.animate,
            instance.speed,
            instance.findArea,
            instance.findAreaMethod,
            instance.startX,
            instance.endX,
            instance.stepAmount,
            instance.onChange);

        // Not in constructor
        newInstance.extraFeatures = instance.extraFeatures;
        newInstance.quadValues = instance.quadValues.slice();

        return newInstance;
    }

    setStepAmount(setAmount: number){
        this.stepAmount = setAmount;
        this.onChange();
    }

    setStartX(startX: number){
        this.startX = startX;
        this.onChange();
    }

    setEndX(endX: number){
        this.endX = endX;
        this.onChange();
    }

    setFindAreaMethod(findAreaMethod: CalculateMethod) {
        this.findAreaMethod = findAreaMethod;
        this.onChange()
    }

    setFindArea(findArea: boolean) {
        this.findArea = findArea;
        this.onChange()
    }

    setAnimate(animate: boolean) {
        this.animate = animate;
        this.onChange()
    }

    setSpeed(speed: number){
        this.speed = speed;
        this.onChange();
    }

    getScale(): number {
        return this.scale * 2;
    }

    setScale(scale: number){
        if(scale < 0)
            return

        this.scale = scale;
        this.onChange();
    }

    getIssue(): IssueType {

        // if (equation.length > 0) {
        //     try {
        //         evaluate(equation, {x: 1});
        //         setIssue(IssueType.NoIssue)
        //     } catch (e) {
        //         setIssue(IssueType.InvalidEquation)
        //     }
        // } else {
        //     setIssue(IssueType.MissingEquation)
        // }
        //
        // if (scale <= 0)
        //     setIssue(IssueType.ScaleToSmall)

        return IssueType.NoIssue;
    }

    setAnyFunction(fun: string){
        this.function = fun;
        this.extraFeatures = false;
        this.onChange();
    }

    setWeirdFunction(a: number, b: number, c: number){
        this.function = a + "x^2 + " + b + "x + " + c;
        this.extraFeatures = true;
        this.quadValues = [a, b, c];
        this.onChange();
    }
}
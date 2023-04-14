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
    TRULE = "Trapezoid rule",
    DISABLED = "Disabled"
}

export class GraphInfo {
    function: string;
    scaleX: number = 10;
    scaleY: number = 10;
    speed: number;
    findAreaMethod: CalculateMethod;
    startX: number;
    endX: number;
    stepAmount: number;
    extraFeatures = false;
    quadValues = [0, 0, 0];
    private readonly onChange: () => void;

    constructor(
        fun: string,
        scaleX: number,
        scaleY: number,
        animateSpeed: number,
        findAreaMethod: CalculateMethod,
        startX: number,
        endX: number,
        stepAmount: number,
        onChange: () => void)
    {
        this.onChange = onChange;
        this.function = fun;
        this.scaleX = scaleX
        this.scaleY = scaleY
        this.speed = animateSpeed;
        this.findAreaMethod = findAreaMethod;
        this.startX = startX;
        this.endX = endX;
        this.stepAmount = stepAmount;
    };

    static cloneFromInstance(instance: GraphInfo): GraphInfo {
        const newInstance = new GraphInfo(
            instance.function,
            instance.scaleX,
            instance.scaleY,
            instance.speed,
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

    setSpeed(speed: number, max: number){
        this.speed = speed;
        this.onChange();
    }

    getScaleX(): number {
        return this.scaleX * 2;
    }

    getScaleY(): number {
        return this.scaleY * 2;
    }

    setScaleX(scaleX: number){
        if(scaleX < 0)
            return

        this.scaleX = scaleX;
        this.onChange();
    }

    setScaleY(scaleY: number){
        if(scaleY < 0)
            return

        this.scaleY = scaleY;
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
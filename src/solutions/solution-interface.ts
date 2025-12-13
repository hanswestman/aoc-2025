export interface SolutionInterface {

    getPart1(): number|Promise<number>;

    getPart2(): number|Promise<number>;

}

export interface SolutionInterfaceConstructor {
    new(inputPath: string): SolutionInterface;
}
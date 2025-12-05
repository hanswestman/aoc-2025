export interface SolutionInterface {

    getPart1(): number;

    getPart2(): number;

}

export interface SolutionInterfaceConstructor {
    new(inputPath: string): SolutionInterface;
}
export default abstract class Repository<TClass> {
  public abstract add(entityObject: TClass): Promise<void>;
  public abstract update(entityObject: TClass): Promise<void | undefined>;
  public abstract get(id: string): Promise<TClass | undefined>;
  public abstract delete(id: string): Promise<void>;
}

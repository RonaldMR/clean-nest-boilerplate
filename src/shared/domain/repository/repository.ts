export default abstract class Repository<TClass> {
  public abstract add(entityObject: TClass): Promise<void>;
  public abstract update(entityObject: TClass): Promise<void>;
  public abstract get(id: string): Promise<TClass>;
  public abstract delete(id: string): Promise<TClass>;
}

// 类型定义
export type HookType = 'before' | 'after' | 'error'
export type HookHandler<T = any> = (context: PluginContext<T>) => void | Promise<void>

export interface PluginContext<T = any> {
    functionName: string
    args: any[]
    result?: T
    error?: Error
    metadata?: Record<string, any>
}

export interface PluginRegistration {
    targetFunction: string
    hookType: HookType
    handler: HookHandler
    priority?: number
}
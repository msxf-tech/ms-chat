import { ThemeConfig } from '../model';

export class ThemeManager {
  private themeConfig: ThemeConfig = {};

  constructor(initialConfig?: ThemeConfig) {
      if (initialConfig) {
          this.setThemeConfig(initialConfig);
      }
  }

  public getThemeConfig(): Readonly<ThemeConfig> {
      return JSON.parse(JSON.stringify(this.themeConfig));
  }

  public setThemeConfig(updates: Partial<ThemeConfig>): void {
      const oldConfig = JSON.parse(JSON.stringify(this.themeConfig));
      this.themeConfig = this.deepMerge(this.themeConfig, updates);
      this.applyCSSVariables(this.findChangedValues(oldConfig, this.themeConfig));
  }

  private findChangedValues(oldObj: ThemeConfig, newObj: ThemeConfig): Array<{com: string, son: string, value: string}> {
      const changes: Array<{com: string, son: string, value: string}> = [];
      
      for (const com in newObj) {
          if (typeof newObj[com as keyof ThemeConfig] === 'object') {
              const comObj = newObj[com as keyof ThemeConfig] as Record<string, string>;
              const oldComObj = oldObj[com as keyof ThemeConfig] as Record<string, string> || {};
              
              for (const son in comObj) {
                  if (!oldComObj || comObj[son] !== oldComObj[son]) {
                      changes.push({
                          com,
                          son,
                          value: comObj[son]
                      });
                  }
              }
          }
      }
      
      return changes;
  }

  private applyCSSVariables(changes: Array<{com: string, son: string, value: string}>): void {
      changes.forEach(({com, son, value}) => {
          const cssVarName = `--mschat--${com}--${son}`;
          if (value === undefined || value === null) {
              document.documentElement.style.removeProperty(cssVarName);
          } else {
              document.documentElement.style.setProperty(cssVarName, value);
          }
      });
  }

  private deepMerge(target: any, source: any): any {
      const output = {...target};
      if (this.isObject(target) && this.isObject(source)) {
          Object.keys(source).forEach(key => {
              if (this.isObject(source[key])) {
                  if (!(key in target)) {
                      output[key] = {...source[key]};
                  } else {
                      output[key] = this.deepMerge(target[key], source[key]);
                  }
              } else {
                  output[key] = source[key];
              }
          });
      }
      return output;
  }

  private isObject(item: any): boolean {
      return item && typeof item === 'object' && !Array.isArray(item);
  }
}

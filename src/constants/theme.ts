export const theme = {
    colors: {
      fonts: {
        primary: "#939393",
        orange: "#C39214",
      },
      headlines: {
        primary: "#E8E8E8",
      },
      background: {
        primary: "#212121",
      },
      icons: {
        primary: "#939393",
      }
    },
    layouts: {
      header: {
        height: 70,
      }
    }
  } as const;
  
  export type ThemeColors = keyof AppTheme["colors"];
  
  type AppTheme = typeof theme;
  
  declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends AppTheme {}
  }
  
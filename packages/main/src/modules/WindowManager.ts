import type {AppModule} from '../AppModule.js';
import {ModuleContext} from '../ModuleContext.js';
import {app, BrowserWindow} from 'electron';
import type {AppInitConfig} from '../AppInitConfig.js';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

class WindowManager implements AppModule {
  readonly #preload: {path: string};
  readonly #renderer: {path: string} | URL;
  readonly #openDevTools;

  constructor({initConfig, openDevTools = false}: {initConfig: AppInitConfig, openDevTools?: boolean}) {
    this.#preload = initConfig.preload;
    this.#renderer = initConfig.renderer;
    this.#openDevTools = openDevTools;
    // 关键：添加 CDP 调试端口
    app.commandLine.appendSwitch('remote-debugging-port', '9222');
  }

  async enable({app}: ModuleContext): Promise<void> {
    // 👇 手动构建 __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    let child: any = null;
    await app.whenReady().then(() => {
      const exePath =
        process.env.NODE_ENV === 'development'
          ? path.join(__dirname, '../executables/xhs-rpa.exe') // dev 路径
          : path.join(process.resourcesPath, 'executables/xhs-rpa.exe'); // 打包后路径

      child = spawn(exePath, [], {
        stdio: 'inherit',
        windowsHide: false,
      });

      child.on('exit', (code:any) => {
        console.log('子进程退出，代码:', code);
      });
    });
    await this.restoreOrCreateWindow(true);
    app.on('second-instance', () => this.restoreOrCreateWindow(true));
    app.on('activate', () => this.restoreOrCreateWindow(true));
    app.on('before-quit', () => {
      if (child) {
        child.kill();
      }
    });
  }

  async createWindow(): Promise<BrowserWindow> {
    const browserWindow = new BrowserWindow({
      autoHideMenuBar: true, // 自动隐藏菜单栏
      movable: false,
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
        webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
        preload: this.#preload.path,
      },
    });

    browserWindow.maximize();
    if (this.#renderer instanceof URL) {
      await browserWindow.loadURL(this.#renderer.href);
    } else {
      await browserWindow.loadFile(this.#renderer.path);
    }

    return browserWindow;
  }

  async restoreOrCreateWindow(show = false) {
    let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

    if (window === undefined) {
      window = await this.createWindow();
    }

    if (!show) {
      return window;
    }

    if (window.isMinimized()) {
      window.restore();
    }

    window?.show();

    if (this.#openDevTools) {
      window?.webContents.openDevTools();
    }

    window.focus();

    return window;
  }

}

export function createWindowManagerModule(...args: ConstructorParameters<typeof WindowManager>) {
  return new WindowManager(...args);
}

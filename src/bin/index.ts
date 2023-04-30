#!/usr/bin/env node
import * as fs from 'fs';

class CreateComponent {
  private appPath: string;
  private componentDirectoryPath: string;
  private pagesDirectoryPath: string;
  private skelComponentDirectoryPath: string;
  private componentArray: string[];
  private ifModePageOrComponent: string;

  constructor(args: string[]) {
    this.appPath = process.cwd();
    this.componentDirectoryPath = `${this.appPath}/src/components`;
    this.pagesDirectoryPath = `${this.appPath}/src/pages`;
    this.skelComponentDirectoryPath = `${this.appPath}/bin/skel`;
    this.componentArray = args.slice(2);
    this.ifModePageOrComponent = args[1];
  }

  init() {
    if(!fs.existsSync(this.componentDirectoryPath)) {
      fs.mkdirSync(this.componentDirectoryPath);
    }
    if(!fs.existsSync(this.pagesDirectoryPath)) {
      fs.mkdirSync(this.pagesDirectoryPath);
    }

    for(let i = 0; i < this.componentArray.length; i++) {
      const componentName = this.componentArray[i];
      
      if(this.checkIfComponentAlreadyExists(componentName)) return;

      if(this.ifModePageOrComponent === 'component') {
        this.createComponentFileFromSkelFile(componentName);
        this.deleteFileAfterCopy(componentName);
      }

      else {
        this.createPageFileFromSkelFile(componentName);
      }
    }
  }

  checkIfComponentAlreadyExists(componentName: string): boolean {
    const component = `${this.componentDirectoryPath}/${componentName}.tsx`;
    return fs.existsSync(component);
  }

  createComponentFileFromSkelFile(componentName: string) {
    const skelComponent = `${this.skelComponentDirectoryPath}/component.tsx`; 
    const component = `${this.skelComponentDirectoryPath}/${componentName}.tsx`;
    try {
      fs.copyFileSync(skelComponent, component);
      const fileContents: string = fs.readFileSync(`${skelComponent}`, 'utf-8').replaceAll('Component', componentName).replaceAll('PropsType', `${componentName}PropsType`);
      fs.writeFileSync(component, fileContents);
      fs.copyFileSync(component, `${this.componentDirectoryPath}/${componentName}.tsx`);
    } catch(e) {
      this.deleteFileAfterCopy(componentName);
      throw new Error('Error: Failed to copy file. Please make sure that the file exists and is accessible.');
    }
  }

  createPageFileFromSkelFile(pageName: string) {
    const skelPage = `${this.skelComponentDirectoryPath}/page.tsx`; 
    const page = `${this.skelComponentDirectoryPath}/${pageName}Page.tsx`;
    try {
      fs.copyFileSync(skelPage, page);
      const fileContents: string = fs.readFileSync(`${skelPage}`, 'utf-8').replaceAll('Page', `${pageName}Page`).replaceAll('PropsType', `${pageName}PageProps`);
      fs.writeFileSync(page, fileContents);
      fs.copyFileSync(page, `${this.pagesDirectoryPath}/${pageName}Page.tsx`);
    } catch(e) {
      this.deleteFileAfterCopy(pageName);
      throw new Error('Error: Failed to copy file. Please make sure that the file exists and is accessible.');
    }
  }

  deleteFileAfterCopy(componentName: string) {
    try {
      fs.unlinkSync(`${this.skelComponentDirectoryPath}/${componentName}.tsx`);
    } catch(e) {
      throw new Error('Error: Failed to delete file. Please make sure that the file exists and is accessible.');
    }
  }
}

const component = new CreateComponent(process.argv.slice(1));
component.init();

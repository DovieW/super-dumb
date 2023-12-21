import { Plugin, TAbstractFile, Platform } from 'obsidian';

export default class MyPlugin extends Plugin {
    async onload() {
        console.log('loading plugin');

        if (Platform.isAndroidApp) {
			// Wait for the layout to be fully ready
			this.app.workspace.onLayoutReady(() => {
				this.createAndDeleteFile();
			});
        }
    }

    async createAndDeleteFile() {
        try {
            const fileName = 'temp-sync-file'; // Include the file extension
            // Check if file exists
            const existingFile = this.app.vault.getAbstractFileByPath(fileName);
            // console.log(existingFile);
            if (existingFile instanceof TAbstractFile) {
                // If file exists, delete it
                // console.log('Deleting file early');
                await this.app.vault.delete(existingFile);
            }

            // Create the file
            const file = await this.app.vault.create(fileName, 'Temporary content');
            // console.log('Created file');
            
            // Logic to make the file invisible in the File Explorer
            // (This part of the functionality needs implementation)

            setTimeout(async () => {
                await this.app.vault.delete(file);
                // console.log('Deleted file');
            }, 1000);
        } catch (error) {
            console.error("Error in creating/deleting the file: ", error);
        }
    }

    onunload() {
        console.log('unloading plugin');
    }
}

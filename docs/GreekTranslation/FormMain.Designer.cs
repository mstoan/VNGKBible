namespace GreekTranslation
{
    partial class FormMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.btnBrowseSource = new System.Windows.Forms.Button();
            this.btnBrowseDictionary = new System.Windows.Forms.Button();
            this.lblSource = new System.Windows.Forms.Label();
            this.lblDictionary = new System.Windows.Forms.Label();
            this.btnRun = new System.Windows.Forms.Button();
            this.btnQuit = new System.Windows.Forms.Button();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 15);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(47, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Source: ";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 48);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(60, 13);
            this.label2.TabIndex = 1;
            this.label2.Text = "Dictionary: ";
            // 
            // btnBrowseSource
            // 
            this.btnBrowseSource.Location = new System.Drawing.Point(65, 10);
            this.btnBrowseSource.Name = "btnBrowseSource";
            this.btnBrowseSource.Size = new System.Drawing.Size(60, 27);
            this.btnBrowseSource.TabIndex = 2;
            this.btnBrowseSource.Text = "Browse";
            this.btnBrowseSource.UseVisualStyleBackColor = true;
            this.btnBrowseSource.Click += new System.EventHandler(this.BtnBrowseSource_Click);
            // 
            // btnBrowseDictionary
            // 
            this.btnBrowseDictionary.Location = new System.Drawing.Point(65, 43);
            this.btnBrowseDictionary.Name = "btnBrowseDictionary";
            this.btnBrowseDictionary.Size = new System.Drawing.Size(60, 30);
            this.btnBrowseDictionary.TabIndex = 3;
            this.btnBrowseDictionary.Text = "Browse";
            this.btnBrowseDictionary.UseVisualStyleBackColor = true;
            this.btnBrowseDictionary.Click += new System.EventHandler(this.BtnBrowseDictionary_Click);
            // 
            // lblSource
            // 
            this.lblSource.AutoSize = true;
            this.lblSource.Location = new System.Drawing.Point(131, 17);
            this.lblSource.Name = "lblSource";
            this.lblSource.Size = new System.Drawing.Size(103, 13);
            this.lblSource.TabIndex = 4;
            this.lblSource.Text = "Choose a source file";
            // 
            // lblDictionary
            // 
            this.lblDictionary.AutoSize = true;
            this.lblDictionary.Location = new System.Drawing.Point(131, 52);
            this.lblDictionary.Name = "lblDictionary";
            this.lblDictionary.Size = new System.Drawing.Size(119, 13);
            this.lblDictionary.TabIndex = 5;
            this.lblDictionary.Text = "Choose a dictionary file.";
            // 
            // btnRun
            // 
            this.btnRun.Location = new System.Drawing.Point(12, 78);
            this.btnRun.Name = "btnRun";
            this.btnRun.Size = new System.Drawing.Size(56, 25);
            this.btnRun.TabIndex = 6;
            this.btnRun.Text = "Run";
            this.btnRun.UseVisualStyleBackColor = true;
            this.btnRun.Click += new System.EventHandler(this.BtnRun_Click);
            // 
            // btnQuit
            // 
            this.btnQuit.Location = new System.Drawing.Point(74, 78);
            this.btnQuit.Name = "btnQuit";
            this.btnQuit.Size = new System.Drawing.Size(58, 24);
            this.btnQuit.TabIndex = 7;
            this.btnQuit.Text = "Quit";
            this.btnQuit.UseVisualStyleBackColor = true;
            this.btnQuit.Click += new System.EventHandler(this.BtnQuit_Click);
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // FormMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(474, 114);
            this.Controls.Add(this.btnQuit);
            this.Controls.Add(this.btnRun);
            this.Controls.Add(this.lblDictionary);
            this.Controls.Add(this.lblSource);
            this.Controls.Add(this.btnBrowseDictionary);
            this.Controls.Add(this.btnBrowseSource);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "FormMain";
            this.Text = "Greek Translation";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btnBrowseSource;
        private System.Windows.Forms.Button btnBrowseDictionary;
        private System.Windows.Forms.Label lblSource;
        private System.Windows.Forms.Label lblDictionary;
        private System.Windows.Forms.Button btnRun;
        private System.Windows.Forms.Button btnQuit;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
    }
}


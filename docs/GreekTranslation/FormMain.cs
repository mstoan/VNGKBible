using System;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace GreekTranslation
{
    public partial class FormMain : Form
    {
        public FormMain()
        {
            InitializeComponent();
        }

        private void BtnBrowseSource_Click(object sender, EventArgs e)
        {
            this.lblSource.Text = Browse();
        }

        private void BtnBrowseDictionary_Click(object sender, EventArgs e)
        {
            this.lblDictionary.Text = Browse();
        }

        private void BtnRun_Click(object sender, EventArgs e)
        {
            string currentLocation = Directory.GetCurrentDirectory() + "\\App_Data";

            if(!Directory.Exists(currentLocation))
            {
                Directory.CreateDirectory("App_Data");
            }

            string[] sourceLines = File.ReadAllLines(this.lblSource.Text);
            string[] dictLines = File.ReadAllLines(this.lblDictionary.Text);

            string transFilename = string.Format(@"{0}\Translation_File_{1}.txt"
                , currentLocation
                , DateTime.Now.ToString("yyyy_MM_dd__HH_mm_ss"));

            string[] curWordsInALine;
            StringBuilder sb = new StringBuilder();
            sb.AppendFormat("***************{0}***************{1}", DateTime.Now.ToString("yyyy-MM-dd HH:MM:SS"), Environment.NewLine);
            File.AppendAllText(transFilename, sb.ToString(), Encoding.UTF8);

            foreach (string line in sourceLines)
            {
                curWordsInALine = line.Split(' ');
                sb.Clear();
                foreach (string transWord in curWordsInALine)
                {
                    //look for the word
                    var wordMeaning =
                        from subLine in dictLines
                        where subLine.ToLower().Contains(transWord.ToLower()) == true
                        select subLine;

                    //first element is the word
                    //second elment is the translation
                    //concat the word + translation
                    if (wordMeaning != null)
                    {
                        sb.AppendFormat("{0} - {1}{2}"
                            , transWord
                            , wordMeaning.FirstOrDefault().ToString().Split('#')[1]
                            , Environment.NewLine);                        
                    }
                }
                //save to file
                File.AppendAllText(transFilename, sb.ToString(), Encoding.UTF8);
            }

            string message = string.Format("The process completes successfully!!!{0}Do you want to navigate the file's location?", Environment.NewLine);

            if (MessageBox.Show(message, "Warning", MessageBoxButtons.YesNo, MessageBoxIcon.Exclamation) == DialogResult.Yes)
            {
                Process.Start("explorer.exe", currentLocation);
            }
        }

        private void BtnQuit_Click(object sender, EventArgs e)
        {
            this.Close();
            this.Dispose();
        }

        private string Browse()
        {
            string filePath = "";
            this.openFileDialog1.Filter = "txt files (*.txt)|*.txt";
            this.openFileDialog1.RestoreDirectory = true;
            this.openFileDialog1.InitialDirectory = Directory.GetCurrentDirectory();

            if (this.openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                filePath = this.openFileDialog1.FileName;
            }

            return filePath;
        }
    }
}

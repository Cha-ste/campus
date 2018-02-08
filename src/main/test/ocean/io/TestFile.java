package ocean.io;

import java.io.*;

/**
 * 测试文件io流，inputStream，outputStream
 */
public class TestFile {
	public static void main(String[] args) {
		createFile();
	}

	static void createFile() {
		// 只是与文件建立连接，还没真正创建文件,为了可移植，此处使用File的separator分隔符
		File file1 = new File("d:" + File.separator + "test.txt");
		// 特殊字符需要转义字符
//		File file2 = new File("d:\\test.doc");
		int flag = 0;
		flag = 1;
		try {
			// 创建文件，当且仅当所提供的路径字符串不存在时，才会新建该文件。不会覆盖已经存在的文件。
			file1.createNewFile();
//			file2.createNewFile();
//			writeFile(file1);
			readFile(file1);
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(file1.exists() + file1.getPath() + flag);
//		file2.deleteOnExit();//在虚拟机终止时，此处即程序运行完了，就执行文件删除。
	}
	
	static void deleteFile(File file)
	{
		if(file.exists())
		{
			file.delete();
		}
	}
	
	/**
	 * 文件内容写入
	 * 写入文件为什么filewriter写入的内容总是放在最后
	 * @param file
	 */
	static void writeFile(File file)
	{
		String data = "those words are written just now ";
		String data2 = "we are create by OutputStream  ";
		try {
			//获得一个文件写入对象,面向字符
			FileWriter fw = new FileWriter(file.getPath(),true);
			//将文件内容转换成计算机能够识别的二进制
			BufferedWriter bw = new BufferedWriter(fw);
			
			//FileOutputStream 面向字节流
			FileOutputStream fos = new FileOutputStream(file);
			
			bw.write(data);
			fos.write(data2.getBytes());
			
			fos.close();
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 读文件
	 * @param file
	 */
	static void readFile(File file)
	{
		try {
			FileReader fr = new FileReader(file);
			BufferedReader br = new BufferedReader(fr);
			try {
				String str = br.readLine();
				System.out.println(str);
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
